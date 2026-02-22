Push Notifications (short guide)

- You need an Apple Developer account to enable Push Notifications.
- In Apple Developer portal: create App ID, enable Push Notifications, create APNs key or certificates.
- In Xcode: Signing & Capabilities -> Add 'Push Notifications' and 'Background Modes' if you want silent pushes.
- On server: use the APNs key to send notifications to user device tokens.

OAuth / Sign-in (short guide)

- For Google: register an OAuth client (iOS) and use `ASWebAuthenticationSession` to authenticate. Set a custom URL scheme for redirect.
- For Sign in with Apple: configure in Apple Developer and use `AuthenticationServices` framework.

If you want, I can scaffold `ASWebAuthenticationSession` usage and example Sign in UI next.