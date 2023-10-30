## Dependencies
- flutter: ^2.10.3
- huddle01_flutter_sdk: ^2.0.0

## Implementation

// Import the necessary packages
import 'package:flutter/material.dart';
import 'package:huddle01_flutter_sdk/huddle01_flutter_sdk.dart';

// Create a widget for sending reactions
class SendReactionButton extends StatelessWidget {
  final Huddle01FlutterSDK huddle01FlutterSDK;
  final String reactionEmoji;

  const SendReactionButton({
    Key? key,
    required this.huddle01FlutterSDK,
    required this.reactionEmoji,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.emoji_emotions),
      onPressed: () async {
        // Send the reaction to Huddle01
        await huddle01FlutterSDK.sendReaction(reactionEmoji);
      },
    );
  }
}

// Add the SendReactionButton widget to the UI
class AudioSpacesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Audio Spaces'),
      ),
      body: Column(
        children: [
          // ... other UI elements
          SendReactionButton(
            huddle01FlutterSDK: Huddle01FlutterSDK(),
            reactionEmoji: '👍',
          ),
          SendReactionButton(
            huddle01FlutterSDK: Huddle01FlutterSDK(),
            reactionEmoji: '❤️',
          ),
          SendReactionButton(
            huddle01FlutterSDK: Huddle01FlutterSDK(),
            reactionEmoji: '👏',
          ),
        ],
      ),
    );
  }
}