import 'package:flutter/material.dart';
import 'package:huddle_01/huddle_01.dart';

class LobbyScreen extends StatefulWidget {
  @override
  State<LobbyScreen> createState() => _LobbyScreenState();
}

class _LobbyScreenState extends State<LobbyScreen> {
  // Create a Huddle01 client
  final Huddle01Client _client = Huddle01Client();

  // List of rooms
  List<Room> _rooms = [];

  // Current room
  Room? _currentRoom;

  @override
  void initState() {
    super.initState();

    // Fetch the list of rooms
    _client.getRooms().then((rooms) {
      setState(() {
        _rooms = rooms;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Audio Spaces'),
      ),
      body: ListView.builder(
        itemCount: _rooms.length,
        itemBuilder: (context, index) {
          // Get the current room
          final room = _rooms[index];

          // Create a tile for the room
          return ListTile(
            title: Text(room.name),
            subtitle: Text(room.description),
            onTap: () {
              // Join the room
              _client.joinRoom(room).then((room) {
                setState(() {
                  _currentRoom = room;
                });
              });
            },
          );
        },
      ),
    );
  }
}
