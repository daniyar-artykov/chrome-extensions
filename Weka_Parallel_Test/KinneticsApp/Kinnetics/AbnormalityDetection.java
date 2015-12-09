
package Kinnetics;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import weka.classifiers.Classifier;
import weka.classifiers.timeseries.WekaForecaster;
import weka.classifiers.timeseries.eval.TSEvaluation;
import weka.core.Instances;
import edu.rit.pj2.Task;

/**
 * Author: David Lavid -16.5.2015
 * To compile and run the CLASSPATH will need to contain:
 * pj2.jar
 * weka.jar (from your weka distribution)
 * pdm-timeseriesforecasting-ce-TRUNK-SNAPSHOT.jar (from the time series package)
 * jcommon-1.0.14.jar (from the time series package lib directory)
 * jfreechart-1.0.13.jar (from the time series package lib directory)
 */
public class AbnormalityDetection {

	public static void main(String[] args) {
		try {
			AbnormalityDetect abnormalityDetect = new AbnormalityDetect();
			abnormalityDetect.main(args);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
class AbnormalityDetect extends Task
{
	// Use a set of classifiers in order to choose the best model for current data segment
	final Classifier[] TimeSeriesForcasterModels = { 
			new weka.classifiers.rules.ZeroR(),
			new weka.classifiers.trees.DecisionStump(),
			new weka.classifiers.trees.REPTree(), 
			new weka.classifiers.trees.RandomTree(),
			new weka.classifiers.meta.Bagging(), 
			new weka.classifiers.trees.M5P(),
			new weka.classifiers.trees.RandomForest(),
			new weka.classifiers.lazy.IBk()
	};
	WekaForecaster forecaster;
	int forcastSteps=1;
	double[][] anomalyData; 
	double[][] anomalyVals;
	double[][] anomalySumMape;
	Lock lock ;
	List<List<Integer>> anomaliesMatrix;
	Instances inputInstances;		
	FileOutputStream fileOutputStream; 
	File file;
	Date date;
	int numOfParameters;
	int samplesPerParameter;
	public void Init() throws FileNotFoundException, IOException
	{
		inputInstances = new Instances(new BufferedReader(new FileReader(".\\testScenarios2.ARFF")));// load the input data
		inputInstances.setClassIndex(0);//TODO:to understand why this necessary
		anomaliesMatrix = new ArrayList<List<Integer>>(); 
		numOfParameters=inputInstances.numAttributes() - 1;
		samplesPerParameter =inputInstances.size();
		anomalyData = new double [numOfParameters+1][samplesPerParameter+1]; 
		anomalyVals = new double [numOfParameters+1][samplesPerParameter+1];
		anomalySumMape= new double [numOfParameters+1][samplesPerParameter+1];
		anomaliesMatrix = new ArrayList<List<Integer>>();
		forcastSteps=1; 
		lock = new ReentrantLock();
		file= new File(".\\testScenarios2.output");
		if (!file.exists()){
			file.createNewFile();
		}
		fileOutputStream = new FileOutputStream(file);
		System.setOut(new PrintStream(fileOutputStream));
	}
	private void outlierDetection(long parameterNum, int forcastModelNum ) throws Exception
	{
		forecaster = new WekaForecaster();  // new forecaster
		forecaster.setFieldsToForecast((inputInstances.attribute((int)parameterNum)).name());//more than 3 params of 40000 samples need more than 8 giga ram
		long modelStarTime=System.currentTimeMillis();
		String summery ="\n**[START] Param "+parameterNum+": "+(inputInstances.attribute((int)parameterNum)).name()+" Model "+forcastModelNum+": " +
				TimeSeriesForcasterModels[forcastModelNum].getClass().toString()+"**\n";//+results;
		forecaster.setBaseForecaster(TimeSeriesForcasterModels[forcastModelNum]); // forecaster.setBaseForecaster(new weka.classifiers.trees.M5P());
		forecaster.getTSLagMaker().setTimeStampField("Date"); // date time stamp
		forecaster.getTSLagMaker().setMinLag(1);
		forecaster.getTSLagMaker().setMaxLag(forcastSteps);

		// add a month of the year indicator field
		forecaster.getTSLagMaker().setAddMonthOfYear(true);
		// add a quarter of the year indicator field
		forecaster.getTSLagMaker().setAddQuarterOfYear(true);

		// build the model
		//lock.lock();
		forecaster.buildForecaster(inputInstances, System.out);//TODO: reimplement this function as thread safe
		//lock.unlock();
		TSEvaluation eval = new TSEvaluation(inputInstances,0.3);
		eval.setHorizon(forcastSteps);
		eval.setPrimeWindowSize(forcastSteps);
		eval.setEvaluationModules("mape"); //,mae,rmse
		eval.setEvaluateOnTrainingData(false);
		eval.setEvaluateOnTestData(true);
		// eval.setRebuildModelAfterEachTestForecastStep(true); //time consuming! but more accurate
		//lock.lock();
		eval.evaluateForecaster(forecaster, System.out);//TODO: reimplement this function as thread safe and parallel
		//lock.unlock();
		eval.CalculateAnomalies();
		summery+= "Anomalies Found : "+eval.anomaliesValuesPerParameter.size()+ " :";
		for(int i=0;i<eval.anomaliesValuesPerParameter.size();i++)
		{
			int ind = eval.anomaliesIndesPerParameter.get(i)+ eval.trainSize+1;
			anomalyData[(int) parameterNum][ind]+=1;
			double val = eval.anomaliesValuesPerParameter.get(i); 
			double mape= eval.anomaliesMapePerParameter.get(i);
			anomalyVals[(int) parameterNum][ind]=val;
			anomalySumMape[(int) parameterNum][ind]+=mape;
			summery+="["+ind+";"+val+";"+mape+"] | " ;
		}		
		double modelEstimaTime=(System.currentTimeMillis()-modelStarTime)/1000.0;
		summery+="\n[END] Param "+parameterNum+": "+(inputInstances.attribute((int)parameterNum)).name()+" Model "+forcastModelNum+": " +
				TimeSeriesForcasterModels[forcastModelNum].getClass().toString()+", Elapsed Time:" + modelEstimaTime + " Seconds\n";
		System.out.println("\n"+summery+"\n");
	}
	public void main(String[] arg0) throws Exception	{
		try {
			Init();
			long starTime=System.currentTimeMillis();
			date =new Date(); 
			System.out.println("\n"+date.toString()+"\n");
			//	workerFor() .exec (new LongLoop(){
			// parallelFor (startParameter, (numOfParameters-1)) .schedule (dynamic).exec (new Loop(){  //1
			// public void run (final long parameterNum) throws Exception { //1	
			for(int parameterNum=0;parameterNum<numOfParameters;parameterNum++){			
				for(int forcastModelNum=0; forcastModelNum<8; forcastModelNum++){
					//parallelFor (0, (8-1)) .schedule (dynamic).exec (new Loop(){  //1
					//	  public void run (final int forcastModelNum) throws Exception { //1	
					outlierDetection(parameterNum,forcastModelNum);
				}//2 for loop
				//	  } });	//  2 parallelFor  loop
			}// 1 for loop
			//}});//1 first parallelFor loop
			long estimaTime = System.currentTimeMillis()-starTime;
			String TotalTimeLabal="\n Total Elapsed Time:" + ((double)estimaTime/1000.0/60.0) + " Minutes";
			System.out.println(TotalTimeLabal);
		} 
		catch (Exception ex) {
			ex.printStackTrace();
			System.out.println("\nException:"+ex.fillInStackTrace()+"\n");
		}
	}


}//end of class

