import React, { createElement } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, EditLayout } from "./components/Layout";
import { TrashPage } from "./pages/TrashPage";
import { LoginPage } from "./pages/LoginPage";
import { InformationPage } from "./pages/InformationPage";
import { DetailPage } from "./pages/DetailPage";
import { DetailListPage } from "./pages/DetailListPage";
import { TraumaListPage } from "./pages/TraumaListPage";
import { PsychosomaticSummaryPage } from "./pages/PsychosomaticSummaryPage";
import { NervousPage } from "./pages/NervousPage";
import { HealthyPage } from "./pages/HealthyPage";
import { TraumaPage } from "./pages/TraumaPage";
import { SleepPage } from "./pages/SleepPage";
import { DistressPage } from "./pages/DistressPage";
import { UndonePageComponent } from "./components/UndonePageComponent";

export default function RoutesComponent() {
  const routeList = [
    { element: LoginPage, path: "/login", key: "login" },
    {
      element: Layout,
      path: "/",
      key: "layout",
      children: [
        { element: InformationPage, index: true, key: "information" },
        { element: TrashPage, path: "/trash", key: "trash" },
        {
          element: DetailListPage,
          path: "/detail-list",
          key: "detail-list",
        },
        {
          element: TraumaListPage,
          path: "/trauma-list",
          key: "trauma-list",
        },
        { element: UndonePageComponent, path: "/undone/*", key: "undone" },
      ],
    },
    {
      element: EditLayout,
      path: "/edit",
      key: "editLayout",
      children: [
        { element: DetailPage, path: "/edit/detail", key: "detail" },
        {
          element: PsychosomaticSummaryPage,
          path: "/edit/psychosomatic-summary",
          key: "psychosomatic-summary",
        },
        { element: NervousPage, path: "/edit/nervous", key: "nervous" },
        { element: HealthyPage, path: "/edit/healthy", key: "healthy" },
        { element: TraumaPage, path: "/edit/trauma", key: "trauma" },
        { element: SleepPage, path: "/edit/sleep", key: "sleep" },
        { element: DistressPage, path: "/edit/distress", key: "distress" },
        { element: UndonePageComponent, path: "/edit/undone/*", key: "undone" },
      ],
    },
  ];


  function routeMap(params) {
    if (params) {
      return params.map(({ children, element, ...item }) =>
        createElement(
          Route,
          { element: element ? createElement(element) : undefined, ...item },
          routeMap(children)
        )
      );
    } else {
      return undefined;
    }
  }

  return (
    <BrowserRouter>
      <Routes>{routeMap(routeList)}</Routes>
    </BrowserRouter>
  );
}
