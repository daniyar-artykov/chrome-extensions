/*
 * Copyright (c) 2010 Pentaho Corporation.  All rights reserved. 
 * This software was developed by Pentaho Corporation and is provided under the terms 
 * of the GNU Lesser General Public License, Version 2.1. You may not use 
 * this file except in compliance with the license. If you need a copy of the license, 
 * please go to http://www.gnu.org/licenses/lgpl-2.1.txt. The Original Code is Time Series 
 * Forecasting.  The Initial Developer is Pentaho Corporation.
 *
 * Software distributed under the GNU Lesser Public License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to 
 * the license for the specific language governing your rights and limitations.
 */

/*
 *    MAPEModule.java
 *    Copyright (C) 2010 Pentaho Corporation
 */

package weka.classifiers.timeseries.eval;

import java.util.ArrayList;
import java.util.List;



import weka.classifiers.evaluation.NumericPrediction;
import weka.core.Utils;

/**
 * Computes the mean absolute percentage error
 * 
 * @author Mark Hall (mhall{[at]}pentaho{[dot]}com)
 * @version $Revision: 49983 $
 */
public class MAPEModule extends ErrorModule {
	
  
  public String getEvalName() {
    return "MAPE";
  }
  
  public String getDescription() {
    return "Mean absolute percentage error";
  }
  
  public String getDefinition() {
    return "sum(abs((predicted - actual) / actual)) / N";
  }
    int truncate;
  public double[] calculateMeasure() throws Exception {

    double[] result = new double[m_targetFieldNames.size()];
    for (int i = 0; i < result.length; i++) {
      result[i] = Utils.missingValue();
    }
    
    for (int i = 0; i < m_targetFieldNames.size(); i++) {
      double sumAbs = 0;
      double currentMAPE=0;
      preds = m_predictions.get(i);

      int count = 0;
      int cnt2 = 0;
      for (NumericPrediction p : preds) {
        if (!Utils.isMissingValue(p.error()) && Math.abs(p.actual()) > 0) {
          currentMAPE =	Math.abs(p.error() / p.actual());
          currentMAPE=currentMAPE*100;
  		  truncate=(int)(currentMAPE*100);
  		  currentMAPE=((double) truncate)/100;
          MAPEstats.addValue(currentMAPE);// TODO : remove this variable and do all statistics on MAPEperPred
          MAPEperPred.add(currentMAPE);
          count++;
        }
        cnt2++;
      }

      if (count > 0) {
    	result[i] = MAPEstats.getMean();
      } else {
        result[i] = Utils.missingValue();
      }

    }
    
    return result;
  }  
}
