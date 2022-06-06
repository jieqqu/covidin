import React from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ReactComponent as ListOpenIcon } from "./../svg/listOpencon.svg";
import { ReactComponent as ListCloseIcon } from "./../svg/listCloseIcon.svg";
import { ProtectedRoute } from "./ProtectedRoute";
import authService from "../services/auth.service";

const list = [
  {
    title: "收案紀錄表",
    item: [
      { name: "收案紀錄表", url: "/detail-list", editUrl: "/edit/detail" },
      {
        name: "新冠肺炎症狀評估表",
        url: "/undone/1",
        editUrl: "/edit/undone/1",
      },
    ],
  },
  {
    title: "身心壓力表",
    item: [
      { name: "困擾溫度計(DT)", url: "/undone/2", editUrl: "/edit/distress" },
      {
        name: "身心調適摘要表",
        url: "/undone/3",
        editUrl: "/edit/psychosomatic-summary",
      },
      { name: "創傷篩檢問卷", url: "/trauma-list", editUrl: "/edit/trauma" },
      { name: "焦慮自我評估量表", url: "/undone/4", editUrl: "/edit/nervous" },
      { name: "病人健康問卷", url: "/undone/5", editUrl: "/edit/healthy" },
      { name: "匹茲堡睡眠品質量表", url: "/undone/6", editUrl: "/edit/sleep" },
      {
        name: "身心壓力評估紀錄表",
        url: "/undone/7",
        editUrl: "/edit/undone/7",
      },
    ],
  },
  {
    title: "社會心理表",
    item: [
      { name: "社會心理資料評估", url: "/undone/8", editUrl: "/edit/undone/8" },
    ],
  },
  {
    title: "電話追蹤表",
    item: [{ name: "電話追蹤表", url: "/undone/9", editUrl: "/edit/undone/9" }],
  },
  {
    title: "匯入",
    item: [{ name: "匯入資料", url: "/undone/10", editUrl: "/edit/undone/10" }],
  },
];

// const Layout = () => {
//   const { pathname } = useLocation();
//   const [layout, setLayout] = React.useState(true);
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     if (!pathname.includes("/edit")) {
//       setLayout(true);
//     } else {
//       setLayout(false);
//     }
//   }, [pathname]);

//   // const user = false;
//   // React.useEffect(() => {
//   //   if (!user) {
//   //     return navigate("/login");
//   //   }
//   // }, [user, navigate]);

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {layout ? <SideComponent /> : <EditSideComponent />}
//       <Outlet />
//     </Box>
//   );
// };

const Layout = () => {
  return (
    <ProtectedRoute>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SideComponent />
        <Outlet />
      </Box>
    </ProtectedRoute>
  );
};

const EditLayout = () => {
  return (
    <ProtectedRoute>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <EditSideComponent />
        <Outlet />
      </Box>
    </ProtectedRoute>
  );
};

function SideComponent() {
  const [open, setOpen] = React.useState();
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (name) => {
    setOpen(name);
  };

  const handleListCheckedBgcolor = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        localStorage.removeItem("cinguan_token");
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "290px",
        bgcolor: "#E4E4D7",
        minHeight: "100vh",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <List sx={{ pt: "165px" }}>
        <Button
          sx={{
            ml: "24px",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#000",
          }}
          onClick={() => navigate("/")}
        >
          個案總覽
        </Button>
        {list.map(({ title, item }) => (
          <Box key={title}>
            <ListItemButton onClick={() => handleClick(title)}>
              <ListItemIcon
                sx={{ minWidth: "21px", padding: "0px 20px 0px 4px" }}
              >
                {open === title ? <ListOpenIcon /> : <ListCloseIcon />}
              </ListItemIcon>
              <ListItemText
                primary={title}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.5rem",
                    color: "#425B99",
                    fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
            <Collapse in={open === title} timeout="auto" unmountOnExit>
              {item.map(({ name, url }) => (
                <List
                  key={name}
                  component="div"
                  disablePadding
                  sx={{
                    background: location.pathname === url ? "#f4f4ea" : null,
                  }}
                >
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => handleListCheckedBgcolor(url, name)}
                  >
                    <ListItemText
                      primary={name}
                      sx={{
                        "& .MuiListItemText-primary": { fontSize: "1.25rem" },
                      }}
                    />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          </Box>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Button
          sx={{ fontSize: "1.5rem", color: "#000", fontWeight: "bold" }}
          onClick={() => navigate("/trash")}
        >
          垃圾桶
        </Button>
        <Button
          sx={{ fontSize: "1.5rem", color: "#000", fontWeight: "bold" }}
          onClick={handleLogout}
        >
          登出
        </Button>
      </Box>
    </Box>
  );
}

const init = {
  edit: true,
  preview: false,
};

function EditSideComponent() {
  const [listOpen, setListOpen] = React.useState(init);
  const [listItemOpen, setListItemOpen] = React.useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleListCheckedBgcolor = (url) => {
    navigate(url);
  };

  const handleEditListClick = () => {
    setListOpen({ ...listOpen, edit: !listOpen.edit });
  };

  const handlePreviewListClick = () => {
    setListOpen({ ...listOpen, preview: !listOpen.preview });
  };

  const handleClick = (name) => {
    setListItemOpen(name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "290px",
        bgcolor: "#E4E4D7",
        minHeight: "100vh",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <List sx={{ pt: "165px" }}>
        <Button
          sx={{
            ml: "24px",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#000",
          }}
          onClick={() => {
            navigate("/");
            localStorage.setItem(
              "cinguan_token",
              JSON.stringify({
                ...JSON.parse(localStorage.getItem("cinguan_token")),
                state: "",
              })
            );
          }}
        >
          個案總覽
        </Button>
        <ListItemButton onClick={handleEditListClick}>
          <ListItemIcon sx={{ minWidth: "21px", padding: "0px 20px 0px 4px" }}>
            {listOpen.edit ? <ListOpenIcon /> : <ListCloseIcon />}
          </ListItemIcon>
          <ListItemText
            primary="編輯"
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "1.5rem",
                color: "#994242",
                fontWeight: "bold",
              },
            }}
          />
        </ListItemButton>
        <Collapse in={listOpen.edit} timeout="auto" unmountOnExit>
          {list
            // .filter((data) => data.title === "收案紀錄表")[0]
            .filter(({ item, title }) =>
              item.some(({ editUrl, name }) => location.pathname === editUrl)
            )[0]
            ?.item.map(({ name, editUrl }) => (
              <List
                key={name}
                component="div"
                disablePadding
                sx={{
                  background: location.pathname === editUrl ? "#f4f4ea" : null,
                }}
              >
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() => handleListCheckedBgcolor(editUrl)}
                >
                  <ListItemText
                    primary={name}
                    sx={{
                      "& .MuiListItemText-primary": { fontSize: "1.25rem" },
                    }}
                  />
                </ListItemButton>
              </List>
            ))}
        </Collapse>
        <ListItemButton onClick={handlePreviewListClick}>
          <ListItemIcon sx={{ minWidth: "21px", padding: "0px 20px 0px 4px" }}>
            {listOpen.preview ? <ListOpenIcon /> : <ListCloseIcon />}
          </ListItemIcon>
          <ListItemText
            primary="預覽"
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "1.5rem",
                color: "#994242",
                fontWeight: "bold",
              },
            }}
          />
        </ListItemButton>
        <Collapse in={listOpen.preview} timeout="auto" unmountOnExit>
          {list
            // .filter(({ title }) => title !== "收案紀錄表" && title !== "匯入")
            .filter(
              ({ title, item }) =>
                !item.some(
                  ({ editUrl, name }) => location.pathname === editUrl
                ) && title !== "匯入"
            )
            .map(({ title, item }) => (
              <Box key={title}>
                <ListItemButton onClick={() => handleClick(title)}>
                  <ListItemIcon
                    sx={{
                      minWidth: "21px",
                      padding: "0px 10px 0px 40px",
                      fontSize: "10px",
                    }}
                  >
                    {listItemOpen === title ? (
                      <ListOpenIcon width="15" />
                    ) : (
                      <ListCloseIcon width="15" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "1.25rem",
                        color: "#A5807B",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </ListItemButton>
                <Collapse
                  in={listItemOpen === title}
                  timeout="auto"
                  unmountOnExit
                >
                  {item.map(({ name, editUrl }) => (
                    <List
                      key={name}
                      component="div"
                      disablePadding
                      sx={{
                        background:
                          location.pathname === editUrl ? "#f4f4ea" : null,
                      }}
                    >
                      <ListItemButton
                        sx={{ pl: 11 }}
                        onClick={() => handleListCheckedBgcolor(editUrl)}
                      >
                        <ListItemText
                          primary={name}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1rem",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </Box>
            ))}
        </Collapse>
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
        <Button
          sx={{ fontSize: "2rem", color: "#000", fontWeight: "bold" }}
          onClick={() => {
            navigate("/");
            localStorage.setItem(
              "cinguan_token",
              JSON.stringify({
                ...JSON.parse(localStorage.getItem("cinguan_token")),
                state: "",
              })
            );
          }}
        >
          結案
        </Button>
      </Box>
    </Box>
  );
}

export { Layout, EditLayout };
