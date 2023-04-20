# React Native Biolerplate (Typescript)

## Prerequisites

- Setup react-native. See [Environment Setup](https://reactnative.dev/docs/environment-setup)
  for more details

- Server running at port 8080

## Android

- Attach an emulator or a device using Android Studio

- Forward port 8080

```sh
adb reverse tcp:8080 tcp:8080
```

- Start app in debug mode

```sh
yarn react-native run-android
```

## IOS

- Attach an emulator or a device using XCode

- Start app in debug mode

```sh
yarn react-native run-ios
```

## Android Build

```sh
yarn build:android:debug
```

## Third Party Credentails

Below credentails is being used on various third party plugins. kindly update this once you create new/update existing.

| Third-party Account | Email/username                 |
| ------------------- | ------------------------------ |
| Firebase            | ashish.khandelwal@aurigait.com |
| Branchio            | ashish@test.com                |
| Playstore           | client@test.com                |
| Codepush            | ashish@test.com                |

## Follow these steps when you are cloning this project and remove this when you are done.

### Setup Firebase

- Create App on firebase
- Add both Android and IOS app and generate google json file
- for Android -> Copy/Replace google-service.json file at root/android/app/google-service.json
- for IOS -> Copy/Replace at root/ios/GoogleService-Info.plist

### Setup Codepush

- Create SEPERATE APP on codepush console
- update credentials in .env.staging for staging and .env.production for production
