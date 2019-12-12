package com.ienergybook;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.gaspardbruno.staticsafeareainsets.RNStaticSafeAreaInsetsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader; 

import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNStaticSafeAreaInsetsPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeOneSignalPackage(),
            new VectorIconsPackage(),
            new AsyncStoragePackage(),
            new GeolocationPackage(),
            new RNCWebViewPackage(),
            new OrientationPackage(),
            new RNLocationPackage(),
            new SvgPackage(),
            new RNGestureHandlerPackage(), 
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
