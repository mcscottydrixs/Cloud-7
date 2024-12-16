#include <iostream> // ewan
#include <fstream> // to create files
#include <string> // ewan
#include <ctime> // oras
#include <iomanip> // to set precision
#include <regex>  // to check the validite of the det
using namespace std;

// structure nga, structure.
struct Event {
    string name;
    string date;
    string venue;
    string ticketPrice;
};

// Load events from file
void loadFromFile(Event events[], int& eventCount) {
    ifstream file("events.txt");
    
    if (!file) {
        cout << "Error: Unable to open file for reading.\n";
        return;
    }

    string line;
    while (getline(file, line) && eventCount < 11) {
        // Each event consists of 4 lines in the file
        events[eventCount].name = line; // first line: event name
        getline(file, events[eventCount].date);  // second line: date
        getline(file, events[eventCount].venue);  // third line: venue
        getline(file, events[eventCount].ticketPrice);  // fourth line: ticket price
        eventCount++;
    }
    
    file.close();  // Close the file after reading
}

// Save events to file
void saveToFile(Event events[], int eventCount) {
    ofstream file("events.txt");
    
    if (!file) {
        cout << "Error: Unable to open file for writing.\n";
        return;
    }

    // Write each event to the file, each property on a new line
    for (int i = 0; i < eventCount; i++) {
        file << events[i].name << "\n"
             << events[i].date << "\n"
             << events[i].venue << "\n"
             << events[i].ticketPrice << "\n";
    }

    file.flush();  // Ensure the file is immediately updated

    // Optionally, close the file explicitly
    file.close();
    cout << "Events saved successfully.\n";
}


// ito eme lang basta validated na MM/DD/YY sya, galing online :)
bool isValidDate(const string& date) {
    regex dateRegex("\\d{2}/\\d{2}/\\d{2}");
    return regex_match(date, dateRegex);
}

// para tama ang input ng pricing (positive number onli or 'free')
bool isValidTicketPrice(const string& price) {
    if (price == "free") return true;
    for (char c : price) {
        if (!isdigit(c) && c != '.') return false;  // only digits and dots are allowed sa price
    }
    return true;
}

// this is our like ano.. main thingy kasi it's the display cout cout yes
void displayEvents(Event events[], int eventCount) {
    cout << "Current Events:\n";
    cout << left << setw(30) << "Event Name" << setw(20) << "Date" << setw(30) << "Venue" << "Ticket Price\n";
    for (int i = 0; i < eventCount; i++) {
        cout << left << setw(30) << events[i].name << setw(20) << events[i].date << setw(30) << events[i].venue << events[i].ticketPrice << "\n";
    }
}

// using void para maadd mo new events, then may limit tayo para di makalat
void addEvent(Event events[], int& eventCount) {
    if (eventCount >= 11) {
        cout << "Event list is full.\n";
        return;
    }

    cout << "Enter event name: ";
    cin.ignore();
    getline(cin, events[eventCount].name);
    // see that chinicheck nya yung event count kung sobra na
    string date;
    do {
        cout << "Enter event date (MM/DD/YY): ";
        getline(cin, date);
        if (isValidDate(date)) {
            events[eventCount].date = date;
            break;
        } else {
            cout << "Invalid date format. Please enter in MM/DD/YY format.\n";
        }
    } while (true);
    // baka naman iexplain ko pa yan. pag else syempre magiging invalid na yan. nasa taas yung code diba.

    cout << "Enter event venue: ";
    getline(cin, events[eventCount].venue);

    string ticketPrice;
    do {
        cout << "Enter ticket price (positive number or 'free'): ";
        getline(cin, ticketPrice);
        if (isValidTicketPrice(ticketPrice)) {
            events[eventCount].ticketPrice = ticketPrice;
            break;
        } else {
            cout << "Invalid ticket price. Please enter a valid number or 'free'.\n";
        }
    } while (true);
    // oh ayan din invalid kase else. then yung code nga sabing nadeclare ko na sa taas.
    eventCount++;
}

// o ito para magedit ng event obvious ba
void editEvent(Event events[], int eventCount) {
    int eventIndex;
    displayEvents(events, eventCount);
    cout << "Enter the event number to edit (1 to " << eventCount << "): ";
    cin >> eventIndex;
    eventIndex--;  // this one naman is to index the events para magmatch lagi yan sha sa array

    if (eventIndex >= 0 && eventIndex < eventCount) {
        cout << "Editing event: " << events[eventIndex].name << "\n";
        
        string newName, newDate, newVenue, newPrice;

        // editing name.. obvious
        cout << "Enter new event name (leave blank to keep current): ";
        cin.ignore();
        getline(cin, newName);
        if (!newName.empty()) events[eventIndex].name = newName;

        // date..
        do {
            cout << "Enter new date (MM/DD/YY) (leave blank to keep current): ";
            getline(cin, newDate);
            if (newDate.empty()) break;
            if (isValidDate(newDate)) {
                events[eventIndex].date = newDate;
                break;
            } else {
                cout << "Invalid date format.\n";
            }
        } while (true);
    // baka naman magtanong pa, e nadeclare ko na nga yung code, editing lang to, same as adding pero editing.

        // edit ng venue
        cout << "Enter new venue (leave blank to keep current): ";
        getline(cin, newVenue);
        if (!newVenue.empty()) events[eventIndex].venue = newVenue;

        // sa ticket price
        do {
            cout << "Enter new ticket price (leave blank to keep current): ";
            getline(cin, newPrice);
            if (newPrice.empty()) break;
            if (isValidTicketPrice(newPrice)) {
                events[eventIndex].ticketPrice = newPrice;
                break;
            } else {
                cout << "Invalid price.\n";
            }
        } while (true);

    } else {
        cout << "Invalid event number.\n";
    }
}

// o para naman to sa deletion ng event
void deleteEvent(Event events[], int& eventCount) {
    int eventIndex;
    displayEvents(events, eventCount);
    cout << "Enter the event number to delete (1 to " << eventCount << "): ";
    cin >> eventIndex;
    eventIndex--;
// again yung index ng events for ano
    if (eventIndex >= 0 && eventIndex < eventCount) {
        for (int i = eventIndex; i < eventCount - 1; i++) {
            events[i] = events[i + 1];
        }
        eventCount--;
        cout << "Event deleted successfully.\n";
    } else {
        cout << "Invalid event number.\n";
    }
}

// this is for preloading lang, this is my input.. duh
void initializePrefilledEvents(Event events[], int& eventCount) {
    events[0] = {"Fan Meet and Greet", "07/07/24", "SM Masinag", "free"};
    events[1] = {"Aster Guesting", "07/07/24", "Robinsons Metro East", "free"};
    events[2] = {"Fan Meet and Greet", "07/13/24", "Venice Grand Canal", "free"};
    events[3] = {"Blooms x Cloud 7 Fanfest", "07/13/24", "Fame Mall Mandaluyong", "free"};
    events[4] = {"Blooms x Cloud 7 Fanfest", "07/14/24", "Grace Mall Taguig", "free"};
    events[5] = {"Award Ceremony", "07/19/24", "Quezon Memorial Circle", "free"};
    events[6] = {"Anniversary Event", "08/24/24", "SM Marikina", "P999"};
    events[7] = {"AMA SC Fun Fest", "10/30/24", "Star City", "P550"};
    events[8] = {"Cloud 7 Mini Concert", "11/09/24", "Viva Cafe Cubao", "P999"};
    events[9] = {"Noel Bazaar Performance", "11/23/24", "World Trade Center Pasay", "P2,550"};
    eventCount = 10;  // this is the inital, pero with the indexing possible sya machange to matchy matchy
}

// ok andito na tayo sa int main
int main() {
    Event events[11];
    int eventCount = 0;

    // load muna naten yung events ko
    initializePrefilledEvents(events, eventCount);

    int choice;
    do {
        cout << "\nEvent Scheduler Menu:\n";
        cout << "1. View Events\n";
        cout << "2. Add Event\n";
        cout << "3. Edit Event\n";
        cout << "4. Delete Event\n";
        cout << "5. Save and Exit\n";
        cout << "Enter your choice: ";

        cin >> choice;
    // switch lang yan, parang di nakikinig
        switch (choice) {
            case 1:
                displayEvents(events, eventCount);
                break;
            case 2:
                addEvent(events, eventCount);
                break;
            case 3:
                editEvent(events, eventCount);
                break;
            case 4:
                deleteEvent(events, eventCount);
                break;
            case 5:
                saveToFile(events, eventCount);
                cout << "Exiting program...\n";
                break;
            default:
                cout << "Invalid choice. Try again.\n";
        }
    } while (choice != 5);

    return 0;
}
// ayan tapos na.