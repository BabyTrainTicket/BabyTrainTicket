package org.babysuper.ticket;

import org.apache.cordova.DroidGap;

import android.os.Bundle;



public class AppMainActivity extends DroidGap {
	
	public void onCreate(Bundle saveInstanceState){
		super.onCreate(saveInstanceState);
		super.loadUrl("file:///android_asset/www/pages/index.html");
	}
}
