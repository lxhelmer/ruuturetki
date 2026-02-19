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
const dailyChallenges = [
  { date: "2026-02-01", value: 1 },
  { date: "2026-02-04", value: 4 },
  { date: "2026-02-08", value: 3 },
  { date: "2026-02-12", value: 87 },
  { date: "2026-02-24", value: 166 },
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
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={loadCalendar}>
            load games
          </Button>
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
          <div className="daily-challenge-content">
            <DailyChallenge
              dailyChallenges={dailyChallenges}
              selectedDate={selectedDate}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/**
 * Renders a daily challenge content if the challenge exists for the selected date.
 */
function DailyChallenge({
  dailyChallenges,
  selectedDate,
}: {
  dailyChallenges: { date: string; value: number }[];
  selectedDate: dayjs.Dayjs;
}) {
  const dailyChallenge = dailyChallenges.find(
    (daily) => daily.date === selectedDate.format("YYYY-MM-DD"),
  );

  return dailyChallenge === undefined ? (
    <h4>No daily challenge yet!</h4>
  ) : (
    <>
      <h4>Daily challenge</h4>
      <p>{dailyChallenge.value}</p>
    </>
  );
}
