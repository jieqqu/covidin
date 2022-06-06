import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const createData = (name, id) => {
  return { name, id };
};

const rows = [
  createData("王大明", "123456789"),
  createData("顏宜臻", "135871435"),
  createData("夏欣馨", "210548738"),
  createData("廖家豪", "987443858"),
];

const handleUserState = (action, user) => {
  switch (action) {
    case "read":
      localStorage.setItem(
        "cinguan_token",
        JSON.stringify({ ...user, state: "read" })
      );
      break;
    case "create":
      localStorage.setItem(
        "cinguan_token",
        JSON.stringify({ ...user, state: "create" })
      );
      break;
    default:
      break;
  }
};

function CreateListTable({ type }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("cinguan_token"));

  const handleClick = (type, user) => {
    handleUserState(type, user);
    user.office_code === "B"
      ? navigate("/edit/distress")
      : navigate("/edit/detail");
  };

  return (
    <TableContainer sx={{ minWidth: "280px", width: "100%", px: 4 }}>
      <Table sx={{ overflow: "hidden" }}>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                border: "3px solid #5E574E",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#5E574E",
              },
            }}
          >
            <TableCell align="center">姓名</TableCell>
            <TableCell align="center">病歷號</TableCell>
            <TableCell align="center">表單</TableCell>
            <TableCell align="center">功能</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ id, name }) => (
            <TableRow
              key={id}
              sx={{
                "& td": {
                  border: "3px solid #5E574E",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell align="center" sx={{ width: "20%" }}>
                {name}
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                {id}
              </TableCell>
              <TableCell align="center" sx={{ width: "30%" }}>
                {type}
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        color: "#699B52",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                      startIcon={<AddIcon />}
                      onClick={() => handleClick("create", user)}
                    >
                      新增
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      sx={{
                        color: "#647A7A",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                      onClick={() => handleClick("read", user)}
                    >
                      查看
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DetailListTable({ url }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("cinguan_token"));

  const handleClick = (type, user) => {
    handleUserState(type, user);
    navigate(url);
  };

  return (
    <TableContainer sx={{ minWidth: "280px", width: "100%", px: 4 }}>
      <Table sx={{ overflow: "hidden" }}>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                border: "3px solid #5E574E",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#5E574E",
              },
            }}
          >
            <TableCell align="center">姓名</TableCell>
            <TableCell align="center">病歷號</TableCell>
            <TableCell align="center">功能</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ id, name }) => (
            <TableRow
              key={id}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              sx={{
                "& td": {
                  border: "3px solid #5E574E",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell align="center" sx={{ width: "20%" }}>
                {name}
              </TableCell>
              <TableCell align="center" sx={{ width: "3 0%" }}>
                {id}
              </TableCell>
              <TableCell align="center" sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        color: "#647A7A",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                      onClick={() => {
                        handleClick("read", user);
                      }}
                    >
                      查看
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      sx={{
                        color: "#647A7A",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                      startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                      onClick={() => alert("無權限修改")}
                    >
                      修改
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      sx={{
                        color: "#647A7A",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      onClick={() => navigate("/trash")}
                    >
                      刪除
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TrashListTable() {
  const navigate = useNavigate();
  return (
    <TableContainer sx={{ minWidth: "280px", width: "100%", px: 4 }}>
      <Table sx={{ overflow: "hidden" }}>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                border: "3px solid #5E574E",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#5E574E",
              },
            }}
          >
            <TableCell align="center">姓名</TableCell>
            <TableCell align="center">病歷號</TableCell>
            <TableCell align="center">功能</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({name}) => (
            <TableRow
              key={name}
              sx={{
                "& td": {
                  border: "3px solid #5E574E",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell align="center" sx={{ width: "20%" }}>
                王大明
              </TableCell>
              <TableCell align="center" sx={{ width: "3 0%" }}>
                123456789
              </TableCell>
              <TableCell align="center" sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        color: "#647A7A",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                    >
                      查看
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      sx={{
                        color: "#647A7A",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        lineHeight: "1.25rem",
                      }}
                    >
                      還原
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CreateListTable, DetailListTable, TrashListTable };
