import 'package:flutter/material.dart';
import 'package:huddle01_flutter_sdk/huddle01_flutter_sdk.dart';

class
 
HomePage
 
extends
 
StatefulWidget
 
{
  @override
  _HomePageState createState() => _HomePageState();
}

class
 
_HomePageState
 
extends
 
State<HomePage> {
  final Huddle01Client _huddle01Client = Huddle01Client();

  void _sendRequestToSpeak() async {
    await _huddle01Client.sendRequestToSpeak();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Audio Spaces'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Raise your hand to speak'),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _sendRequestToSpeak,
              child: Text('Send request to speak'),
            ),
          ],
        ),
      ),
    );
  }
}
