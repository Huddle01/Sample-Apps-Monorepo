import 'package:flutter/material.dart';
import 'package:huddle_01/huddle_01.dart';

class AudioSpacesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Audio Spaces',
      home: AudioSpacesHomePage(),
    );
  }
}

class AudioSpacesHomePage extends StatefulWidget {
  @override
  _AudioSpacesHomePageState createState() => _AudioSpacesHomePageState();
}

class _AudioSpacesHomePageState extends State<AudioSpacesHomePage> {
  final HuddleClient _huddleClient = HuddleClient();

  List<HuddleUser> _listeners = [];
  List<HuddleUser> _speakers = [];

  @override
  void initState() {
    super.initState();

    _huddleClient.onUserJoined.listen((user) {
      if (user.isSpeaking) {
        _speakers.add(user);
      } else {
        _listeners.add(user);
      }

      setState(() {});
    });

    _huddleClient.onUserLeft.listen((user) {
      if (_speakers.contains(user)) {
        _speakers.remove(user);
      } else if (_listeners.contains(user)) {
        _listeners.remove(user);
      }

      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Audio Spaces'),
      ),
      body: Column(
        children: [
          Expanded(
            child: GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 1.0,
              ),
              itemCount: _speakers.length,
              itemBuilder: (context, index) {
                final speaker = _speakers[index];

                return SpeakerCard(
                  speaker: speaker,
                );
              },
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            itemCount: _listeners.length,
            itemBuilder: (context, index) {
              final listener = _listeners[index];

              return ListenerCard(
                listener: listener,
              );
            },
          ),
        ],
      ),
    );
  }
}

class SpeakerCard extends StatelessWidget {
  final HuddleUser speaker;

  SpeakerCard({required this.speaker});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(speaker.name),
          Text(speaker.isMuted ? 'Muted' : 'Speaking'),
        ],
      ),
    );
  }
}

class ListenerCard extends StatelessWidget {
  final HuddleUser listener;

  ListenerCard({required this.listener});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(listener.name),
          Text('Listening'),
        ],
      ),
    );
  }
}
