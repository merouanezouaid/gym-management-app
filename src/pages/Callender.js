import React, { useState, useEffect } from "react";

import Axios from "axios";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";

import Page from "../components/Page";

import NewSchedule from "./Schedule/NewSchedule";

export default function Callender() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const eventGuid = 0;
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
   await Axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/`).then((response) => {
      setEvents(
        response.data?.map((object) => {
          if (object.daysOfWeek.length === 0) {
            delete object.daysOfWeek;
          }
          return object;
        })
      );
      // console.log(events);
    });
  }, [open]);

  const createEventId = () => String(eventGuid + 1);

  const INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: "Seance Taekwondo Cadet (Coach Ali Mezouary)",
      daysOfWeek: [0, 4],
      start: todayStr,
      startTime: "10:00:00",
      endTime: "12:00:00",
    },
    {
      id: createEventId(),
      title: "Timed event",
      start: `${todayStr}T12:00:00`,
      end: `${todayStr}T14:00:00`,
    },
  ];

  const renderSidebar = () => {
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </div>
    </div>;
  };

  const handleDateSelect = (selectInfo) => {
    setOpen(!open);
    // // dialog and
    // const title = prompt("Please enter a new title for your event");
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => {
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>;
  };

  const renderSidebarEvent = (event) => {
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>;
  };

  return (
    <Page title="Schedule | My Gym">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Schedule
          </Typography>
        </Stack>
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable
            selectMirror
            dayMaxEvents
            weekends={weekendsVisible}
            events={events} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          <NewSchedule isOpen={open} toggle={handleDateSelect} />
        </div>
      </Container>
    </Page>
  );
}
