import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

// ignore: must_be_immutable
class HomePage extends StatefulWidget {
  var value;

  HomePage({Key key, this.value}) : super(key: key);

  @override
  _HomePage createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  final areaIdController = TextEditingController();

  Future deleteArea() async {
    String areaId = areaIdController.text;

    var url = "https://area-georges.herokuapp.com/deleteAreaFromId";
    var response = await http.post(url, body: {"id": areaId});
    var rest = response.body;

    if (rest == "done") {
      print("area with id:$areaId has been deleted");
    }
  }

  Future changeStateAreaOnGoning() async {
    String areaId = areaIdController.text;
    String state = "ongoing";

    var url = "https://area-georges.herokuapp.com/areaStateChange";
    var response = await http.post(url, body: {"id": areaId, "state": state});
    var rest = response.body;

    if (rest != "nope") {
      print("area (with id:$areaId) state was update for $state");
    }
  }

  Future changeStateAreaOnPause() async {
    String areaId = areaIdController.text;
    String state = "pause";

    var url = "https://area-georges.herokuapp.com/areaStateChange";
    var response = await http.post(url, body: {"id": areaId, "state": state});
    var rest = response.body;

    if (rest != "nope") {
      print("area (with id:$areaId) state was update for $state");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text('Area: Dashboard'), automaticallyImplyLeading: false),
        body: ListView(
          children: [
            Card(
              clipBehavior: Clip.antiAlias,
              child: Column(
                children: [
                  Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Text('Area Management'),
                  ),
                  Padding(
                    padding: EdgeInsets.all(16.0),
                    child: TextField(
                      decoration: InputDecoration(
                          labelText: 'Area ID',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8))),
                      controller: areaIdController,
                    ),
                  ),
                  ButtonBar(
                    alignment: MainAxisAlignment.center,
                    children: [
                      RaisedButton(
                        onPressed: () {
                          deleteArea();
                        },
                        color: Colors.red,
                        textColor: Colors.white,
                        child: Text('Delete'),
                      ),
                      RaisedButton(
                        onPressed: () {
                          changeStateAreaOnPause();
                        },
                        color: Colors.blue,
                        textColor: Colors.white,
                        child: Text('Pause'),
                      ),
                      RaisedButton(
                        onPressed: () {
                          changeStateAreaOnGoning();
                        },
                        color: Colors.blue,
                        textColor: Colors.white,
                        child: Text('onGoing'),
                      )
                    ],
                  ),
                ],
              ),
            )
          ],
        ));
  }
}
