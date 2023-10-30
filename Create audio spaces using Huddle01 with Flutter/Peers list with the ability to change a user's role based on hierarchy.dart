import 'package:flutter/material.dart';
import 'package:huddle01_flutter/huddle01_flutter.dart';

class PeersList extends StatefulWidget {
  @override
  _PeersListState createState() => _PeersListState();
}

class _PeersListState extends State<PeersList> {
  List<User> _peers = [];

  @override
  void initState() {
    super.initState();

    Huddle01.getPeers().then((peers) {
      setState(() {
        _peers = peers;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _peers.length,
      itemBuilder: (context, index) {
        final peer = _peers[index];

        return ListTile(
          title: Text(peer.name),
          subtitle: Text(peer.role),
          trailing: DropdownButton<UserRole>(
            value: peer.role,
            onChanged: (role) {
              Huddle01.setPeerRole(peer, role).then((_) {
                setState(() {
                  peer.role = role;
                });
              });
            },
            items: UserRole.values.map((role) {
              return DropdownMenuItem<UserRole>(
                value: role,
                child: Text(role.toString()),
              );
            }).toList(),
          ),
        );
      },
    );
  }
}


///Add the PeersList widget to your app's main screen

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Audio Spaces'),
        ),
        body: PeersList(),
      ),
    );
  }
}
