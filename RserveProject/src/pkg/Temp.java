package pkg;

import org.rosuda.REngine.Rserve.RConnection;

public class Temp {

	public static void main(String args[]) {
		RConnection connection = null;

		try {
			connection = new RConnection();
			String vector = "c(1,2,3,4)";
			connection.eval("meanVal=mean(" + vector + ")");
			double mean = connection.eval("meanVal").asDouble();
			System.out.println("The mean of given vector is=" + mean);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
