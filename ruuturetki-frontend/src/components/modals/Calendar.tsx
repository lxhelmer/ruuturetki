import { Button, Modal } from "react-bootstrap";
import calendarservice from "../../services/dailyChallenge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { useEffect, useMemo, useState } from "react";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { DailyChallenge } from "../../types/types";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarkers from "../MapMarkers";
import { useNavigate } from "react-router-dom";
import { tileLayerOptions } from "../../utils/mapLayerHelpers";

// Set monday as the first day of the week
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});
// Create a dark theme for the calendar
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// Some arbitrary data for testing the calendar
// const dailyChallengesExamples: DailyChallenge[] = [
//   {
//     date: "2026-02-11",
//     dailyChallenge: [
//       {
//         id: 0,
//         latlng: {
//           lat: 60.17072018908489,
//           lng: 24.93802070617676,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 1,
//         latlng: {
//           lat: 60.17313229308546,
//           lng: 24.93973731994629,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 2,
//         latlng: {
//           lat: 60.17347381562102,
//           lng: 24.94458675384522,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 3,
//         latlng: {
//           lat: 60.171638090243235,
//           lng: 24.945359230041507,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 4,
//         latlng: {
//           lat: 60.169994388616885,
//           lng: 24.942355155944824,
//         },
//         zoom: 16,
//         draggable: true,
//       },
//     ],
//     maplayer: "avoindata:Ortoilmakuva_2019_20cm",
//   },
//   {
//     date: "2026-02-21",
//     dailyChallenge: [
//       {
//         id: 0,
//         latlng: {
//           lat: 60.17072018908489,
//           lng: 24.93802070617676,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 1,
//         latlng: {
//           lat: 60.17313229308546,
//           lng: 24.93973731994629,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 2,
//         latlng: {
//           lat: 60.17347381562102,
//           lng: 24.94458675384522,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 3,
//         latlng: {
//           lat: 60.171638090243235,
//           lng: 24.945359230041507,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 4,
//         latlng: {
//           lat: 60.169994388616885,
//           lng: 24.942355155944824,
//         },
//         zoom: 16,
//         draggable: true,
//       },
//     ],
//     maplayer: "avoindata:Ortoilmakuva_2019_21cm",
//   },
//   {
//     date: "2026-02-21",
//     dailyChallenge: [
//       {
//         id: 0,
//         latlng: {
//           lat: 60.17072018908489,
//           lng: 24.93802070617676,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 1,
//         latlng: {
//           lat: 60.17313229308546,
//           lng: 24.93973731994629,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 2,
//         latlng: {
//           lat: 60.17347381562102,
//           lng: 24.94458675384522,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 3,
//         latlng: {
//           lat: 60.171638090243235,
//           lng: 24.945359230041507,
//         },
//         zoom: 16,
//         draggable: false,
//       },
//       {
//         id: 4,
//         latlng: {
//           lat: 60.169994388616885,
//           lng: 24.942355155944824,
//         },
//         zoom: 16,
//         draggable: true,
//       },
//     ],
//     maplayer: "avoindata:Ortoilmakuva_2019_20cm",
//   },
// ];

/**
 * A calendar modal for viewing daily challenges.
 */
export default function Calendar({
  show,
  handleCloseCalendar,
  setChallenge,
}: {
  show: boolean;
  handleCloseCalendar: () => void;
  setChallenge: React.Dispatch<
    React.SetStateAction<DailyChallenge | undefined>
  >;
}) {
  // Initialize state variables
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);

  // Load daily challenges
  useEffect(() => {
    fetchDailies();
  }, []);

  // Convert dailychallenge dates to a set for faster lookup
  const dateSet = useMemo(() => {
    try {
      const set = new Set(dailyChallenges.map((daily) => daily.date));
      // console.log("Memoized set:", set);
      return set;
    } catch (error) {
      console.log("Cannot convert daily challenges dates to a set:", error);
      return new Set(""); // Return empty set if the conversion fails
    }
  }, [dailyChallenges]);

  /**
   * Loads daily challenges from the database and saves them to the state variable.
   */
  async function fetchDailies() {
    try {
      const response: DailyChallenge[] = await calendarservice.getAll();
      console.log("Dailies fetched, response:", response);
      setDailyChallenges(response);
    } catch (error) {
      console.log("Cannot fetch dailies:", error);
    }
  }

  /**
   * Handles clicking different dates on the calendar by saving
   * the date to the component's state.
   * */
  const handleDateChange = (date: PickerValue) =>
    date === null
      ? console.log("Invalid date selected!")
      : setSelectedDate(date);

  /**
   * Loads daily challenges from the backend.
   *  */
  const loadCalendar = async () => {
    try {
      fetchDailies();
    } catch {
      console.log("could not fetch games");
    }
  };

  // Next two functions run for every visible day in the calendar.
  // The functions highlight days that have a daily challenge and do
  // nothing for the days that don't have challenges yet.
  const HighlightedDay = styled(PickersDay)(({ theme }) => ({
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }));
  const CustomDay = function CustomDay({
    day,
    outsideCurrentMonth,
    onDaySelect,
    isFirstVisibleCell,
    isLastVisibleCell,
  }: {
    day: dayjs.Dayjs;
    outsideCurrentMonth: boolean;
    onDaySelect: (day: dayjs.Dayjs) => void;
    isFirstVisibleCell: boolean;
    isLastVisibleCell: boolean;
  }) {
    const isSelected =
      !outsideCurrentMonth && dateSet.has(day.format("YYYY-MM-DD"));
    return (
      <HighlightedDay
        selected={isSelected}
        isFirstVisibleCell={isFirstVisibleCell}
        isLastVisibleCell={isLastVisibleCell}
        onDaySelect={onDaySelect}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseCalendar}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Daily Calendar</Modal.Title>
          <Button className="reload" variant="secondary" onClick={loadCalendar}>
            reload daily challenges
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="calendar-modal-body">
            <div className="calendar">
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    defaultValue={today}
                    slots={{ day: CustomDay }} // Highlight days with daily challenges
                    slotProps={{ actionBar: { actions: [] } }} // Disable default buttons
                    displayWeekNumber // Important
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
            <div className="daily-challenge-content">
              <DailyChallengeContent
                dailyChallenges={dailyChallenges}
                selectedDate={selectedDate}
                setChallenge={setChallenge}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/**
 * Renders a daily challenge content if the challenge exists for the selected date.
 */
function DailyChallengeContent({
  dailyChallenges,
  selectedDate,
  setChallenge,
}: {
  dailyChallenges: DailyChallenge[];
  selectedDate: dayjs.Dayjs;
  setChallenge: React.Dispatch<
    React.SetStateAction<DailyChallenge | undefined>
  >;
}) {
  const navigate = useNavigate();
  // Find a daily challenge corresponding to the selected date
  let dailyChallenge: DailyChallenge | undefined;
  try {
    dailyChallenge = dailyChallenges.find(
      (daily) => daily.date === selectedDate.format("YYYY-MM-DD"),
    );
  } catch (error) {
    console.log("Cannot find daily challenge:", error);
  }

  // Exit early if no daily challenge for the selected date
  if (dailyChallenge === undefined)
    return <h5>Daily challenge for {selectedDate.format("YYYY-MM-DD")}</h5>;

  // Define options for map view and markers
  const mapOptions: L.MapOptions = {
    center: [60.170678, 24.941543],
    zoom: 13,
  };
  const roundLocations = dailyChallenge.dailyChallenge.map(
    (round) => round.latlng,
  );

  // Clicking play starts a game with the selected challenge
  const handlePlay = () => {
    setChallenge(dailyChallenge);
    navigate("/game");
  };

  const today = dayjs();
  const beforeToday = selectedDate.isBefore(today, "day");
  const afterToday = !beforeToday;
  const isToday = today.isSame(selectedDate, "day");

  return (
    <>
      <h5>
        Daily challenge for{" "}
        {isToday ? "today" : selectedDate.format("YYYY-MM-DD")}
      </h5>
      <table>
        <tbody>
          <tr>
            <td>
              <b>Maplayer:</b>
            </td>
            <td>
              <i>{dailyChallenge.maplayer}</i>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Play button shown only for todays challenge */}
      {isToday && (
        <Button variant="secondary" onClick={handlePlay}>
          play
        </Button>
      )}
      {/* Map view of the locations. Shown only for past dates. */}
      {beforeToday && (
        <MapContainer id="calendar-map" {...mapOptions}>
          <TileLayer {...tileLayerOptions()} />
          <MapMarkers locations={roundLocations} delay={0} />
        </MapContainer>
      )}
      {/* Text to display for challenges in the place of the map */}
      {afterToday && (
        <p>
          Locations are revealed a day after the challenge date. For this
          challenge the reveal date will be{" "}
          {selectedDate.add(1, "day").format("YYYY-MM-DD")}.
        </p>
      )}
    </>
  );
}
