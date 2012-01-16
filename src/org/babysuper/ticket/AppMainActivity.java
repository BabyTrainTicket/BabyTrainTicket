package org.babysuper.ticket;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class AppMainActivity extends DroidGap {
	
	public void onCreate(Bundle saveInstanceState){
		super.onCreate(saveInstanceState);
		super.loadUrl("file:///android_asset/www/pages/index.html");
	}
}
