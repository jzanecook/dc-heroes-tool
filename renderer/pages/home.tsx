import React from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Link from '../components/Link';
import { styled } from "@mui/material";

const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  };
});

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  const [ActingValue, setActingValue] = React.useState(0);
  const [OpposingValue, setOpposingValue] = React.useState(0);
  const [ActingRoll, setActingRoll] = React.useState(0);
  const [EffectValue, setEffectValue] = React.useState(0);
  const [ResistanceValue, setResistanceValue] = React.useState(0);

  const StandardGroups = [
    { label: "0", values: [0] },
    { label: "1-2", values: [1, 2] },
    { label: "3-4", values: [3, 4] },
    { label: "5-6", values: [5, 6] },
    { label: "7-8", values: [7, 8] },
    { label: "9-10", values: [9, 10] },
    { label: "11-12", values: [11, 12] },
    { label: "13-15", values: [13, 14, 15] },
    { label: "16-18", values: [16, 17, 18] },
    { label: "19-21", values: [19, 20, 21] },
    { label: "22-24", values: [22, 23, 24] },
    { label: "25-27", values: [25, 26, 27] },
    { label: "28-30", values: [28, 29, 30] },
    { label: "31-35", values: [31, 32, 33, 34, 35] },
    { label: "36-40", values: [36, 37, 38, 39, 40] },
    { label: "41-45", values: [41, 42, 43, 44, 45] },
    { label: "46-50", values: [46, 47, 48, 49, 50] },
    { label: "51-55", values: [51, 52, 53, 54, 55] },
    { label: "56-60", values: [56, 57, 58, 59, 60] },
  ];

  const ResultTableGroups = [
    { label: "1-2", values: [1] },
    { label: "3-4", values: [2, 1] },
    { label: "5-6", values: [3, 2, 1] },
    { label: "7-8", values: [5, 4, 3, 2] },
    { label: "9-10", values: [8, 6, 4, 3, 2] },
    { label: "11-12", values: [10, 9, 7, 6, 4, 3] },
    { label: "13-15", values: [12, 11, 9, 8, 7, 5, 3] },
    { label: "16-18", values: [14, 13, 11, 10, 9, 8, 6, 4] },
    { label: "19-21", values: [18, 17, 16, 14, 12, 10, 8, 6, 4] },
    { label: "22-24", values: [21, 20, 19, 17, 15, 13, 11, 9, 7, 5] },
    { label: "25-27", values: [24, 23, 22, 20, 18, 16, 14, 12, 10, 8, 6] },
    { label: "28-30", values: [27, 26, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7] },
    {
      label: "31-35",
      values: [30, 29, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8],
    },
    {
      label: "36-40",
      values: [35, 34, 33, 31, 29, 27, 25, 23, 21, 19, 17, 14, 12, 9],
    },
    {
      label: "41-45",
      values: [40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 13, 10],
    },
    {
      label: "46-50",
      values: [45, 43, 41, 40, 38, 36, 34, 31, 28, 26, 24, 22, 20, 17, 14, 11],
    },
    {
      label: "51-55",
      values: [
        50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 27, 24, 21, 18, 15, 12,
      ],
    },
    {
      label: "56-60",
      values: [
        55, 53, 51, 49, 47, 45, 43, 41, 39, 36, 33, 30, 27, 24, 21, 18, 15, 13,
      ],
    },
  ];

  const getActingValueIndex = (actingValue: number) => {
    return StandardGroups.findIndex((group) =>
      group.values.includes(actingValue)
    );
  };
  const getOpposingValueIndex = (opposingValue: number) => {
    return StandardGroups.findIndex((group) =>
      group.values.includes(opposingValue)
    );
  };

  const downwardValues = [9, 7, 5, 4, 3];
  const upwardValues = [
    13, 15, 18, 21, 24, 28, 32, 36, 40, 45, 50, 55, 60, 65, 70, 75, 80,
  ];

  const getActionTableCellValue = (
    actingIndex: number,
    opposingIndex: number
  ) => {
    if (actingIndex > 60 || opposingIndex > 60) {
      return 9999;
    }

    if (actingIndex === opposingIndex) {
      return 11;
    }
    if (actingIndex === 0 && opposingIndex === 1) {
      return 6;
    }
    if (actingIndex === 0 && opposingIndex === 2) {
      return 5;
    }
    if (actingIndex === 0 && opposingIndex === 3) {
      return 4;
    }
    if (actingIndex < opposingIndex) {
      return downwardValues.length - 1 < opposingIndex - actingIndex
        ? 3
        : downwardValues[opposingIndex - actingIndex - 1];
    }
    if (actingIndex > opposingIndex) {
      return upwardValues[actingIndex - opposingIndex - 1];
    }

    return 0;
  };
  const getActingRollRAPs = () => {
    const actingRollIndex = [12, ...upwardValues]
      .map((v, i) => v <= ActingRoll && i)
      .filter((v) => !!v)
      .pop();

    const opposingRollThreshold =
      StandardGroups[getOpposingValueIndex(OpposingValue)].values;
    console.log({
      OpposingValue,
      getOpposingValueIndex: getOpposingValueIndex(OpposingValue),
      opposingRollThreshold,
    });

    if (ActingValue > 60 || OpposingValue > 60) {
      return 9999;
    }

    return isNaN(actingRollIndex)
      ? opposingRollThreshold.includes(ActingRoll)
        ? 0
        : -1
      : actingRollIndex;

    return isNaN(actingRollIndex)
      ? ActingRoll === 11 || ActingRoll === 12
        ? 0
        : -1
      : actingRollIndex;
  };

  const getResultRollValue = () => {
    const resistanceIndex = StandardGroups.findIndex((group) =>
      group.values.includes(ResistanceValue)
    );
    const effectIndex = StandardGroups.findIndex((group) =>
      group.values.includes(EffectValue)
    );

    const RAPs = getActingRollRAPs();

    if (RAPs === 9999) {
      return 9999;
    }
    if (RAPs === -1) {
      return -1;
    }

    if (ResistanceValue === 0) {
      return `A + ${RAPs}`;
    }

    return resistanceIndex - RAPs === 0
      ? "A"
      : resistanceIndex - RAPs < 0
      ? `A + ${Math.abs(resistanceIndex - RAPs)}`
      : ResultTableGroups[effectIndex].values[resistanceIndex - RAPs - 1] ??
        "N";

    return (
      ResultTableGroups[effectIndex].values[resistanceIndex - RAPs - 1] ?? "N"
    );
  };

  const getActionTableRow = (rowIndex: number) => {
    return (
      <TableRow key={`actingValueRow_${rowIndex}`}>
        <TableCell
          sx={{
            width: "min-content",
            backgroundColor: StandardGroups[rowIndex].values.includes(
              ActingValue
            )
              ? "rgba(255, 255, 255, 0.12)"
              : "transparent",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          key={`actingValueRow_label`}
          align="center"
        >
          <Typography
            variant="caption"
            sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
          >
            {StandardGroups[rowIndex].label}
          </Typography>
        </TableCell>
        {StandardGroups.map((_g, colIndex) => (
          <TableCell
            sx={{
              width: "min-content",
              backgroundColor:
                StandardGroups[rowIndex].values.includes(ActingValue) ||
                StandardGroups[colIndex].values.includes(OpposingValue)
                  ? (getActionTableCellValue(colIndex, rowIndex) ===
                      ActingRoll ||
                      (getActionTableCellValue(colIndex + 1, rowIndex) >
                        ActingRoll &&
                        getActionTableCellValue(colIndex, rowIndex) <
                          ActingRoll)) &&
                    rowIndex === getActingValueIndex(ActingValue)
                    ? "rgba(255, 155, 155, 0.48)"
                    : getActionTableCellValue(colIndex, rowIndex) <=
                        ActingRoll &&
                      rowIndex === getActingValueIndex(ActingValue)
                    ? "rgba(255, 255, 255, 0.48)"
                    : "rgba(255, 255, 255, 0.12)"
                  : "transparent",
            }}
            key={`actingValueRow_${rowIndex}_${colIndex}`}
            align="center"
          >
            <Typography
              variant="caption"
              sx={{
                whiteSpace: "nowrap",
                fontWeight:
                  getActionTableCellValue(rowIndex, colIndex) <= 11
                    ? "bold"
                    : "light",
              }}
            >
              {getActionTableCellValue(colIndex, rowIndex)}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const getResultTableRow = (rowIndex: number) => {
    return (
      <TableRow key={`actingValueRow_${rowIndex}`}>
        <TableCell
          sx={{
            width: "min-content",
            backgroundColor: StandardGroups[rowIndex].values.includes(
              EffectValue
            )
              ? "rgba(255, 255, 255, 0.12)"
              : "transparent",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          key={`actingValueRow_label`}
          align="center"
        >
          <Typography
            variant="caption"
            sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
          >
            {StandardGroups[rowIndex].label}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            width: "min-content",
            backgroundColor: StandardGroups[rowIndex].values.includes(
              EffectValue
            )
              ? "rgba(255, 255, 255, 0.12)"
              : "transparent",
          }}
          key={`actingValueRow_X`}
          align="center"
        >
          +1
        </TableCell>
        <TableCell
          sx={{
            width: "min-content",
            backgroundColor:
              StandardGroups[rowIndex].values.includes(EffectValue) ||
              ResistanceValue === 0
                ? "rgba(255, 255, 255, 0.12)"
                : "transparent",
          }}
          key={`actingValueRow_0`}
          align="center"
        >
          <b>A</b>
        </TableCell>
        {ResultTableGroups[rowIndex].values.map((v, colIndex) => (
          <TableCell
            sx={{
              width: "min-content",
              backgroundColor:
                StandardGroups[rowIndex].values.includes(EffectValue) ||
                StandardGroups[colIndex + 1].values.includes(ResistanceValue)
                  ? StandardGroups[rowIndex].values.includes(EffectValue) &&
                    StandardGroups[colIndex + 1].values.includes(
                      ResistanceValue
                    )
                    ? "rgba(255, 255, 255, 0.48)"
                    : "rgba(255, 255, 255, 0.12)"
                  : "transparent",
            }}
            key={`resultTableRow_${rowIndex}_${colIndex}`}
            align="center"
          >
            <Typography
              variant="caption"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              {v}
            </Typography>
          </TableCell>
        ))}
        {ResultTableGroups[ResultTableGroups.length - 1].values.map(
          (v, colIndex) =>
            colIndex < ResultTableGroups[rowIndex].values.length ? null : (
              <TableCell
                sx={{
                  width: "min-content",
                  backgroundColor:
                    StandardGroups[rowIndex].values.includes(EffectValue) ||
                    StandardGroups[colIndex + 1].values.includes(
                      ResistanceValue
                    )
                      ? StandardGroups[rowIndex].values.includes(EffectValue) &&
                        StandardGroups[colIndex + 1].values.includes(
                          ResistanceValue
                        )
                        ? "rgba(255, 255, 255, 0.48)"
                        : "rgba(255, 255, 255, 0.12)"
                      : "transparent",
                }}
                key={`resultTableRow_${rowIndex}_${colIndex}`}
                align="center"
              >
                <Typography
                  variant="caption"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  <b>N</b>
                </Typography>
              </TableCell>
            )
        )}
        {/* {StandardGroups.map((_g, colIndex) => (
          <TableCell
            sx={{
              width: "min-content",
              backgroundColor:
                StandardGroups[rowIndex].values.includes(ActingValue) ||
                StandardGroups[colIndex].values.includes(OpposingValue)
                  ? (getActionTableCellValue(colIndex, rowIndex) ===
                      ActingRoll ||
                      (getActionTableCellValue(colIndex + 1, rowIndex) >
                        ActingRoll &&
                        getActionTableCellValue(colIndex, rowIndex) <
                          ActingRoll)) &&
                    rowIndex === getActingValueIndex(ActingValue)
                    ? "rgba(255, 155, 155, 0.48)"
                    : getActionTableCellValue(colIndex, rowIndex) <=
                        ActingRoll &&
                      rowIndex === getActingValueIndex(ActingValue)
                    ? "rgba(255, 255, 255, 0.48)"
                    : "rgba(255, 255, 255, 0.12)"
                  : "transparent",
            }}
            key={`actingValueRow_${rowIndex}_${colIndex}`}
            align="center"
          >
            <Typography
              variant="caption"
              sx={{
                whiteSpace: "nowrap",
                fontWeight:
                  getActionTableCellValue(rowIndex, colIndex) <= 11
                    ? "bold"
                    : "light",
              }}
            >
              {getActionTableCellValue(colIndex, rowIndex)}
            </Typography>
          </TableCell>
        ))} */}
      </TableRow>
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>DC Heroes Tool vZ.0.1</title>
      </Head>
      <Root
        sx={{
          maxHeight: "calc(100vh - 1.5rem)",
          overflowY: "scroll",
          marginTop: "1.5rem",
          "&::-webkit-scrollbar": {
            width: "0.4em",
            paddingTop: "0.5rem",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            outline: "1px solid slategrey",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
          },
        }}
      >
        <div
          style={{
            content: "",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: -1,
            background:
              "linear-gradient(to right,rgba(65, 0, 255, 0.4),rgba(255, 0, 232, 0.3))",
          }}
        />
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            zIndex: "-2",
            objectFit: "cover",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <source src="/video/live_bg.webm" type="video/webm" />
        </video>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction={{ md: "column", lg: "row" }} spacing={2}>
            <Stack direction="column" spacing={1} width={1} p={2}>
              <Stack direction="column" spacing={1} width={1}>
                <Paper>
                  <Stack direction="column" spacing={1} width={1} p={1}>
                    <Typography variant="subtitle1">
                      Action Table Values
                    </Typography>
                    <TextField
                      id="ActingValue"
                      label="Acting Value"
                      type="number"
                      size="small"
                      value={ActingValue}
                      onChange={(e) => setActingValue(parseInt(e.target.value))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="OpposingValue"
                      label="Opposing Value"
                      type="number"
                      size="small"
                      value={OpposingValue}
                      onChange={(e) =>
                        setOpposingValue(parseInt(e.target.value))
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="ActingValue"
                      label="Acting Roll"
                      type="number"
                      size="small"
                      value={ActingRoll}
                      onChange={(e) => setActingRoll(parseInt(e.target.value))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Stack direction="column" spacing={1} width={1}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flex: 1,
                          justifyContent: "space-between",
                          maxWidth: 200,
                        }}
                      >
                        {getActingRollRAPs() === 9999 ? (
                          <Typography
                            variant="body2"
                            gutterBottom
                            color="error"
                          >
                            Error: One or more values outside of acceptable
                            range. This tool can't do this math yet, bro.
                          </Typography>
                        ) : getActingRollRAPs() === 17 ? (
                          <Typography
                            variant="body2"
                            gutterBottom
                            color="error"
                          >
                            Warning: Acting Roll is 17, this means it <i>may</i>{" "}
                            be more than 17 (since I only have the RAPs for up
                            to 17, which is a roll of 80).
                          </Typography>
                        ) : getActingRollRAPs() === -1 ? (
                          <>
                            <Typography variant="body2" gutterBottom>
                              Acting RAPs
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Failure
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography variant="body2" gutterBottom>
                              Acting RAPs
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {getActingRollRAPs()}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
                <Paper>
                  <Stack direction="column" spacing={1} width={1} p={1}>
                    <Typography variant="subtitle1">
                      Result Table Values
                    </Typography>
                    <TextField
                      id="EffectValue"
                      label="Effect Value"
                      type="number"
                      size="small"
                      value={EffectValue}
                      onChange={(e) => setEffectValue(parseInt(e.target.value))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="ResistanceValue"
                      label="Resistance Value"
                      type="number"
                      size="small"
                      value={ResistanceValue}
                      onChange={(e) =>
                        setResistanceValue(parseInt(e.target.value))
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        flex: 1,
                        justifyContent: "space-between",
                        maxWidth: 200,
                      }}
                    >
                      {getResultRollValue() === 9999 ? (
                        <Typography variant="body2" gutterBottom color="error">
                          Error: One or more values outside of acceptable range.
                          This tool can't do this math yet, bro.
                        </Typography>
                      ) : getResultRollValue() === -1 ? (
                        <>
                          <Typography variant="body2" gutterBottom>
                            Result Value
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Failure
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" gutterBottom>
                            Result Value
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {getResultRollValue()}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="h5" gutterBottom>
                Action Table {/** !!! ACTION TABLE */}
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ maxWidth: "min-content" }}
              >
                <Table
                  sx={{ minWidth: 700, tableLayout: "fixed" }}
                  aria-label="Acting Table"
                  size="small"
                  padding="none"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "min-content" }}>
                        &nbsp;
                      </TableCell>
                      {StandardGroups.map((group) => (
                        <TableCell
                          sx={{
                            width: "min-content",
                            backgroundColor: group.values.includes(
                              OpposingValue
                            )
                              ? "rgba(255, 255, 255, 0.12)"
                              : "transparent",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                          key={`opposingValueHeader_${group.label}`}
                          align="center"
                        >
                          <Stack direction="column" spacing={0}>
                            {group.label
                              .replace("-", " to ")
                              .split(" ")
                              .map((word) => (
                                <Typography
                                  variant="caption"
                                  key={`opposingValueHeader_${group.label}_${word}`}
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {word}
                                </Typography>
                              ))}
                          </Stack>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {StandardGroups.map((_g, rowIndex) =>
                      rowIndex === 0 ? null : getActionTableRow(rowIndex)
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="h5" gutterBottom>
                Result Table {/** !!! RESULT TABLE */}
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ maxWidth: "min-content" }}
              >
                <Table
                  sx={{ minWidth: 700, tableLayout: "fixed" }}
                  aria-label="Result Table"
                  size="small"
                  padding="none"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "min-content" }}>
                        &nbsp;
                      </TableCell>
                      <TableCell sx={{ width: "min-content" }} align="center">
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          X
                        </Typography>
                      </TableCell>
                      {StandardGroups.map((group) => (
                        <TableCell
                          sx={{
                            width: "min-content",
                            backgroundColor: group.values.includes(
                              ResistanceValue
                            )
                              ? "rgba(255, 255, 255, 0.12)"
                              : "transparent",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                          key={`opposingValueHeader_${group.label}`}
                          align="center"
                        >
                          <Stack direction="column" spacing={0}>
                            {group.label
                              .replace("-", " to ")
                              .split(" ")
                              .map((word) => (
                                <Typography
                                  variant="caption"
                                  key={`opposingValueHeader_${group.label}_${word}`}
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {word}
                                </Typography>
                              ))}
                          </Stack>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ResultTableGroups.map((_g, rowIndex) =>
                      getResultTableRow(rowIndex)
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Stack>
      </Root>
    </React.Fragment>
  );
}

export default Home;
