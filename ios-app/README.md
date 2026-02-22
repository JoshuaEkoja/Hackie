HackBase iOS App (SwiftUI)

Overview

This folder contains SwiftUI source files and setup instructions to create a native iOS app that connects to your local backend (`http://localhost:3000`). It’s a minimal scaffold — open Xcode, create a new iOS App (SwiftUI) project, then replace the generated files with the code below.

Steps to install

1. On your Mac open Xcode and create a new project:
   - Template: App (iOS)
   - Interface: SwiftUI
   - Lifecycle: SwiftUI App
   - Product Name: HackBase
   - Language: Swift

2. Replace the contents of `HackBaseApp.swift`, `ContentView.swift` and add the other files from this folder into the project.

3. Update `Info.plist` to allow insecure localhost requests during development (App Transport Security exceptions) if needed:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

4. Run the app on the iOS Simulator. For real-device push notifications and custom URL schemes you will need an Apple Developer account.

Notes on features

- Network calls in `ChatService.swift` target `http://localhost:3000`. If you serve the backend elsewhere, change `baseURL`.
- Push notifications: require an Apple Developer account, APNs certificate, and server-side integration (not scaffolded here). See "Push Notifications" below.
- OAuth / Sign-in: sample code uses `ASWebAuthenticationSession` pattern; you must register redirect URIs and client IDs with the provider.

Push Notifications (summary)

- You need an Apple Developer account and to enable Push Notifications for the app ID.
- Create an APNs key in developer portal and upload it to your server to send notifications.
- Configure capabilities in Xcode -> Signing & Capabilities -> Push Notifications.

OAuth (summary)

- For Google sign-in, register the app and set an OAuth redirect.
- For Sign in with Apple use the built-in `SignInWithApple` flow (requires Apple ID entitlements).

Files included

- `HackBaseApp.swift` — App entry
- `ContentView.swift` — Main chat UI
- `ChatService.swift` — Networking to backend (`/chat`, `/context`)
- `ContextView.swift` — Modal for context configuration

If you want, I can generate a complete Xcode project file too (it will be a larger change). Tell me whether you'd like that or prefer these source files to paste into a new Xcode project.
