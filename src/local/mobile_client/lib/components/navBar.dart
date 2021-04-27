import 'package:flutter/material.dart';
import '../pages/home.dart';
//import '../pages/service.dart';
import '../pages/link.dart';
import '../pages/profile.dart';

// ignore: must_be_immutable
class NavigationBarWidget extends StatefulWidget {
  var value;

  NavigationBarWidget({Key key, this.value}) : super(key: key);

  @override
  _NavigationBarWidgetState createState() => _NavigationBarWidgetState();
}

class _NavigationBarWidgetState extends State<NavigationBarWidget> {
  int selectedIndex = 0;
  List<String> pageNames = ["Dashboard", "Link", "Profile"];
  List<Widget> _widgetOptions() => [
        HomePage(value: widget.value),
        //ServicePage(value: widget.value),
        LinkPage(value: widget.value),
        ProfilePage(value: widget.value)
      ];

  void _onItemTapped(int index) {
    setState(() {
      selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> widgetOptions = _widgetOptions();
    return Scaffold(
        backgroundColor: Colors.grey.shade50,
        resizeToAvoidBottomInset: false,
        body: Center(
          child: widgetOptions.elementAt(selectedIndex),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard),
              // ignore: deprecated_member_use
              title: Text('Dashboard'),
            ),
            /*BottomNavigationBarItem(
              icon: Icon(Icons.list),
              // ignore: deprecated_member_use
              title: Text('Service'),
            ),*/
            BottomNavigationBarItem(
              icon: Icon(Icons.link),
              // ignore: deprecated_member_use
              title: Text('Link'),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              // ignore: deprecated_member_use
              title: Text('Profile'),
            )
          ],
          currentIndex: selectedIndex,
          selectedItemColor: Colors.lightBlueAccent,
          unselectedItemColor: Colors.grey.shade700,
          onTap: _onItemTapped,
        ));
  }
}
