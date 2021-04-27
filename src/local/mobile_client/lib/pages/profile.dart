import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile_client/pages/login.dart';

// ignore: must_be_immutable
class ProfilePage extends StatefulWidget {
  var value;

  ProfilePage({Key key, this.value}) : super(key: key);

  @override
  _ProfilePage createState() => _ProfilePage();
}

class _ProfilePage extends State<ProfilePage> {
  logout(BuildContext context) {
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => LoginPage()));
  }

  getProfile() async {
    final url = "https://area-georges.herokuapp.com/profil";
    final response = await http.post(url, body: {"userId": widget.value});
    final res = json.decode(response.body);

    if (res != "nope") {
      final String data = await res as String;
      return (data);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text('Area: Profile'), automaticallyImplyLeading: false),
        body: Center(
            child: Column(
          children: <Widget>[
            RaisedButton(
              onPressed: () {
                logout(context);
              },
              color: Colors.red,
              textColor: Colors.white,
              child: Text('Logout'),
            )
          ],
        )));
  }
}
