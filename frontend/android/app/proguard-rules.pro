# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Add any ProGuard rules you need here

# Preserve all annotations
-keepattributes *Annotation*

# Keep all classes with the name 'MainActivity'
-keep class com.your.package.name.MainActivity

# Keep all classes in a specific package
-keep class com.your.package.name.** { *; }
