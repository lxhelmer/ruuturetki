import { Button, Modal } from "react-bootstrap";
import calendarservice from "../../services/dailyChallenge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { memo, useMemo, useState } from "react";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { DailyChallenge } from "../../types/types";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarkers from "../MapMarkers";

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
const dailyChallenges: DailyChallenge[] = [
  {
    date: "2026-02-11",
    dailyChallenge: [
      {
        id: 0,
        latlng: {
          lat: 60.17072018908489,
          lng: 24.93802070617676,
        },
        zoom: 16,
        draggable: false,
      },
      {
        id: 1,
        latlng: {
          lat: 60.17313229308546,
          lng: 24.93973731994629,
        },
        zoom: 16,
        draggable: false,
      },
      {
        id: 2,
        latlng: {
          lat: 60.17347381562102,
          lng: 24.94458675384522,
        },
        zoom: 16,
        draggable: false,
      },
      {
        id: 3,
        latlng: {
          lat: 60.171638090243235,
          lng: 24.945359230041507,
        },
        zoom: 16,
        draggable: false,
      },
      {
        id: 4,
        latlng: {
          lat: 60.169994388616885,
          lng: 24.942355155944824,
        },
        zoom: 16,
        draggable: true,
      },
    ],
    maplayer: "avoindata:Ortoilmakuva_2024_5cm",
  },
  {
    date: "2026-02-17",
    dailyChallenge: [
      {
        id: 0,
        latlng: {
          lat: 60.44799054795659,
          lng: 22.26458787918091,
        },
        zoom: 16,
        draggable: false,
      },
      {
        id: 1,
        latlng: {
          lat: 60.44875253025832,
          lng: 22.256004810333256,
        },
        zoom: 17,
        draggable: false,
      },
      {
        id: 2,
        latlng: {
          lat: 60.450953712063914,
          lng: 22.256669998168945,
        },
        zoom: 18,
        draggable: false,
      },
      {
        id: 3,
        latlng: {
          lat: 60.44723913123926,
          lng: 22.26063966751099,
        },
        zoom: 18,
        draggable: false,
      },
      {
        id: 4,
        latlng: {
          lat: 60.44463549662398,
          lng: 22.267205715179447,
        },
        zoom: 18,
        draggable: true,
      },
    ],
    maplayer: "Ilmakuva 2022 True ortho",
  },
];

/**
 * A calendar modal for viewing daily challenges.
 */
export default function Calendar({
  show,
  handleCloseCalendar,
}: {
  show: boolean;
  handleCloseCalendar: () => void;
}) {
  // Convert array to set for faster lookup
  const dateSet = useMemo(() => {
    return new Set(dailyChallenges.map((daily) => daily.date));
  }, []);

  // Initialize state variables
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);

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
      const calendar = await calendarservice.getAll();
      console.log("Calendar loaded, dailies:", calendar);
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
  const CustomDay = memo(function CustomDay({
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
  });

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
          <Button variant="secondary" onClick={loadCalendar}>
            load games
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
}: {
  dailyChallenges: DailyChallenge[];
  selectedDate: dayjs.Dayjs;
}) {
  const dailyChallenge = dailyChallenges.find(
    (daily) => daily.date === selectedDate.format("YYYY-MM-DD"),
  );

  // Exit early if no daily challenge for the selected date
  if (dailyChallenge === undefined)
    return <h5>Daily challenge for the selected day</h5>;

  const resultMapOptions: L.MapOptions = {
    center: [60.170678, 24.941543],
    zoom: 13,
  };

  const roundLocations = dailyChallenge.dailyChallenge.map(
    (round) => round.latlng,
  );
  return (
    <>
      <h5>Daily challenge for the selected day</h5>
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
      <MapContainer id="calendar-map" {...resultMapOptions}>
        <TileLayer
          attribution={
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
          url={
            "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
          }
        />
        <MapMarkers locations={roundLocations} />
      </MapContainer>
    </>
  );
}
