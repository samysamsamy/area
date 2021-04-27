import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:url_launcher/url_launcher.dart';

// ignore: must_be_immutable
class LinkPage extends StatefulWidget {
  var value;
  LinkPage({Key key, this.value}) : super(key: key);
  @override
  _LinkPage createState() => _LinkPage();
}

class ServiceAction {
  int id;
  String name;

  ServiceAction(this.id, this.name);

  static List<ServiceAction> getServicesActions() {
    return <ServiceAction>[
      ServiceAction(1, 'OpenWeather'),
      ServiceAction(2, 'Youtube'),
      ServiceAction(3, 'Spotify'),
      ServiceAction(4, 'Trello'),
      ServiceAction(5, 'Github'),
      ServiceAction(6, 'github'),
      ServiceAction(7, 'Discord')
    ];
  }
}

class ServiceReaction {
  int id;
  String name;

  ServiceReaction(this.id, this.name);

  static List<ServiceReaction> getServicesReactions() {
    return <ServiceReaction>[
      ServiceReaction(1, 'SendGrid'),
      ServiceReaction(2, 'Trello'),
      ServiceReaction(3, 'Clicksend'),
      ServiceReaction(4, 'Discord'),
      ServiceReaction(5, 'Spotify')
    ];
  }
}

class _LinkPage extends State<LinkPage> {
  final areaNameControler = TextEditingController();
  final areaConditionControler = TextEditingController();
  final areaInstructionControler = TextEditingController();

  List listId = [];

  List<ServiceAction> _servicesActions = ServiceAction.getServicesActions();
  List<DropdownMenuItem<ServiceAction>> _dropdownMenuItemsActions;
  ServiceAction _selectedServiceAction;

  List<DropdownMenuItem<ServiceAction>> buildDropdownMenuItems(
      List servicesActions) {
    List<DropdownMenuItem<ServiceAction>> itemsAction = List();
    for (ServiceAction serviceAction in servicesActions) {
      itemsAction.add(
        DropdownMenuItem(
          value: serviceAction,
          child: Text(serviceAction.name),
        ),
      );
    }
    return itemsAction;
  }

  onChangeDropdownItemAction(ServiceAction selectedServiceAction) {
    setState(() {
      _selectedServiceAction = selectedServiceAction;
    });
  }

  List<ServiceReaction> _servicesReactions =
      ServiceReaction.getServicesReactions();
  List<DropdownMenuItem<ServiceReaction>> _dropdownMenuItemsReactions;
  ServiceReaction _selectedServiceReaction;

  @override
  void initState() {
    _dropdownMenuItemsActions = buildDropdownMenuItems(_servicesActions);
    _selectedServiceAction = _dropdownMenuItemsActions[0].value;
    _dropdownMenuItemsReactions =
        buildDropdownMenuItemsReaction(_servicesReactions);
    _selectedServiceReaction = _dropdownMenuItemsReactions[0].value;
    super.initState();
  }

  List<DropdownMenuItem<ServiceReaction>> buildDropdownMenuItemsReaction(
      List servicesReactions) {
    List<DropdownMenuItem<ServiceReaction>> itemsReaction = List();
    for (ServiceReaction serviceReaction in servicesReactions) {
      itemsReaction.add(
        DropdownMenuItem(
          value: serviceReaction,
          child: Text(serviceReaction.name),
        ),
      );
    }
    return itemsReaction;
  }

  onChangeDropdownItemReaction(ServiceReaction selectedServiceReaction) {
    setState(() {
      _selectedServiceReaction = selectedServiceReaction;
    });
  }

  String capitalize(String string) {
    if (string == null) {
      throw ArgumentError.notNull('string');
    } else if (string.isEmpty) {
      return string;
    }
    return string[0].toUpperCase() + string.substring(1);
  }

  Future createArea() async {
    String areaName = areaNameControler.text;
    String widgetAction;
    String areaCondition = areaConditionControler.text;
    String widgetReaction;
    String areaInstruction = areaInstructionControler.text;

    switch (_selectedServiceAction.name) {
      case 'OpenWeather':
        {
          widgetAction = 'Current_weather_data';
        }
        break;
      case 'Youtube':
        {
          widgetAction = 'New_Video_In_Channel';
        }
        break;
      case 'Spotify':
        {
          widgetAction = 'New_Music_In_Playlist';
        }
        break;
      case 'Trello':
        {
          widgetAction = 'Get_Created_Card';
        }
        break;
      case 'Discord':
        {
          widgetAction = 'Get_Messages';
        }
        break;
      case 'Github':
        {
          widgetAction = 'New_Issue';
        }
        break;
      case 'github':
        {
          widgetAction = 'New_Commit';
          _selectedServiceAction.name = capitalize(_selectedServiceAction.name);
        }
        break;
    }

    switch (_selectedServiceReaction.name) {
      case 'SendGrid':
        {
          widgetReaction = 'Mail_Send';
        }
        break;
      case 'Trello':
        {
          widgetReaction = 'Create_a_new_Card';
        }
        break;
      case 'Clicksend':
        {
          widgetReaction = 'Send_SMS';
        }
        break;
      case 'Discord':
        {
          widgetReaction = 'Send_Messages';
        }
        break;
      case 'Spotify':
        {
          widgetReaction = 'Add_Music_In_Playlist';
        }
        break;
    }

    var url = "https://area-georges.herokuapp.com/newArea";
    var data = {
      "userId": widget.value,
      "areaName": areaName,
      "serviceAction": _selectedServiceAction.name,
      "widgetAction": widgetAction,
      "condition": areaCondition,
      "serviceReaction": _selectedServiceReaction.name,
      "widgetReaction": widgetReaction,
      "instruction": areaInstruction,
    };

    var response = await http.post(url, body: data);
    var res = response.body;

    if (res != null) {
      print(res);
    }
  }

  // ignore: missing_return
  Future getUrlOauth2Action() async {
    var url = '';
    var urlYT = 'https://area-georges.herokuapp.com/youtubeOauth';
    var urlGH = 'https://area-georges.herokuapp.com/githubOauth';
    var urlSpot = 'https://area-georges.herokuapp.com/spotifyOauth';
    var urlDiscord = 'https://area-georges.herokuapp.com/discordOauth';
    var urlTrello = 'https://area-georges.herokuapp.com/trelloOauth';

    switch (_selectedServiceAction.name) {
      case 'Youtube':
        {
          url = urlYT;
        }
        break;
      case 'Github':
        {
          url = urlGH;
        }
        break;
      case 'Discord':
        {
          url = urlDiscord;
        }
        break;
      case 'Spotify':
        {
          url = urlSpot;
        }
        break;
      case 'Trello':
        {
          url = urlTrello;
        }
        break;
    }

    if (_selectedServiceAction.name != 'Discord') {
      var response = await http.post(url, body: {"userID": widget.value});
      var res = json.decode(response.body);
      await canLaunch(res) ? await launch(res) : throw 'Could not launch $res';
    } else {
      var response = await http.get(url);
      var res = json.decode(response.body);
      await canLaunch(res) ? await launch(res) : throw 'Could not launch $res';
    }
  }

  Future getUrlOauth2Reaction() async {
    var url = '';
    var urlTrello = 'https://area-georges.herokuapp.com/trelloOauth';
    var urlDiscord = 'https://area-georges.herokuapp.com/discordOauth';
    var urlSpot = 'https://area-georges.herokuapp.com/spotifyOauth';

    switch (_selectedServiceReaction.name) {
      case 'Trello':
        {
          url = urlTrello;
        }
        break;
      case 'Discord':
        {
          url = urlDiscord;
        }
        break;
      case 'Spotify':
        {
          url = urlSpot;
        }
        break;
    }
    if (_selectedServiceReaction.name != 'Discord') {
      var response = await http.post(url, body: {"userID": widget.value});
      var res = json.decode(response.body);
      await canLaunch(res) ? await launch(res) : throw 'Could not launch $res';
    } else {
      var response = await http.get(url);
      var res = json.decode(response.body);
      await canLaunch(res) ? await launch(res) : throw 'Could not launch $res';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:
          AppBar(title: Text('Area: Link'), automaticallyImplyLeading: false),
      body: ListView(
        children: [
          Card(
            clipBehavior: Clip.antiAlias,
            child: Column(
              children: [
                ListTile(title: Center(child: Text('Create Area'))),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: TextField(
                    decoration: InputDecoration(
                        labelText: 'area name',
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8))),
                    controller: areaNameControler,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    children: <Widget>[
                      Text("Select a service action"),
                      SizedBox(
                        height: 20.0,
                      ),
                      DropdownButton(
                        value: _selectedServiceAction,
                        items: _dropdownMenuItemsActions,
                        onChanged: onChangeDropdownItemAction,
                      ),
                      SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
                RaisedButton(
                  onPressed: () {
                    getUrlOauth2Action();
                  },
                  color: Colors.red,
                  textColor: Colors.white,
                  child: Text('connect'),
                ),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: TextField(
                    decoration: InputDecoration(
                        labelText: 'area condition',
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8))),
                    controller: areaConditionControler,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    children: <Widget>[
                      Text("Select a service reaction"),
                      SizedBox(
                        height: 20.0,
                      ),
                      DropdownButton(
                        value: _selectedServiceReaction,
                        items: _dropdownMenuItemsReactions,
                        onChanged: onChangeDropdownItemReaction,
                      ),
                      SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
                RaisedButton(
                  onPressed: () {
                    getUrlOauth2Reaction();
                  },
                  color: Colors.red,
                  textColor: Colors.white,
                  child: Text('connect'),
                ),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: TextField(
                    decoration: InputDecoration(
                        labelText: 'area instruction',
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8))),
                    controller: areaInstructionControler,
                  ),
                ),
                ButtonBar(
                  alignment: MainAxisAlignment.center,
                  children: [
                    RaisedButton(
                      onPressed: () {
                        createArea();
                      },
                      color: Colors.blue,
                      textColor: Colors.white,
                      child: Text('create'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
