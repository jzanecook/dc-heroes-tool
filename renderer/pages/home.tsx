import React from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import electron from "electron";
// import Link from '../components/Link';
import { styled } from "@mui/material";

const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    marginTop: "calc(2rem + 1px)",
  };
});

import type * as CSS from "csstype";

interface CombatManeuver {
  id: string;
  label: string;
  ov: number;
  minimumFlag?: boolean;
  rv: number;
  conflicts?: string[];
}

interface ExtraCSSTypes extends CSS.Properties {
  WebkitAppRegion?: string;
  "&:hover"?: CSS.Properties;
}

const titlebarStyle: ExtraCSSTypes = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "2rem",
  backgroundColor: "#12121260",
  backdropFilter: "blur(4px)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  zIndex: 1,
  WebkitAppRegion: "drag",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
};

const TitleBar = () => (
  <div style={titlebarStyle}>
    <Typography variant="body2">DC Heroes Tool - Version Z.0.1</Typography>
    <Stack
      direction="row"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        WebkitAppRegion: "no-drag",
      }}
    >
      <Button
        sx={{
          width: "2rem",
          minWidth: "unset",
          borderRadius: 0,
          height: "2rem",
          backgroundColor: "transparent",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          padding: 0,
        }}
        onClick={() => {
          const ipcRenderer = electron.ipcRenderer || false;
          if (ipcRenderer) {
            ipcRenderer.send("minimize");
          }
        }}
      >
        🗕
      </Button>
      <Button
        sx={{
          width: "2rem",
          minWidth: "unset",
          borderRadius: 0,
          height: "2rem",
          backgroundColor: "transparent",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          padding: 0,
        }}
        onClick={() => {
          const ipcRenderer = electron.ipcRenderer || false;
          if (ipcRenderer) {
            ipcRenderer.send("maximize");
          }
        }}
      >
        🗖
      </Button>
      <Button
        sx={{
          width: "2rem",
          minWidth: "unset",
          borderRadius: 0,
          height: "2rem",
          backgroundColor: "transparent",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          padding: 0,
        }}
        onClick={() => {
          const ipcRenderer = electron.ipcRenderer || false;
          if (ipcRenderer) {
            ipcRenderer.send("close");
          }
        }}
      >
        X
      </Button>
    </Stack>
  </div>
);

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  const [ActingValue, setActingValue] = React.useState(0);
  const [OpposingValue, setOpposingValue] = React.useState(0);
  const [ActingRoll, setActingRoll] = React.useState(0);
  const [EffectValue, setEffectValue] = React.useState(0);
  const [ResistanceValue, setResistanceValue] = React.useState(0);
  const [CombatManeuvers, setCombatManeuvers] = React.useState<string[]>([]);

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

  const combatManeuvers: CombatManeuver[] = [
    {
      id: "critblow",
      label: "Critical Blow",
      ov: 2,
      rv: -2,
    },
    {
      id: "devastating",
      label: "Devastating Attack",
      ov: 4,
      rv: -6,
    },
    {
      id: "flailing",
      label: "Flailing Attack",
      ov: -2,
      rv: +3,
    },
    {
      id: "grappling",
      label: "Grappling Attack",
      ov: 0,
      rv: 0,
    },
    {
      id: "multiattack2",
      label: "Multi-Attack on 2",
      ov: 1,
      rv: 1,
      conflicts: [
        "multiattack34",
        "multiattack58",
        "multiattack915",
        "multiattack1630",
        "multiattack3160",
        "multiattack61125",
      ],
    },
    {
      id: "multiattack34",
      label: "Multi-Attack on 3-4",
      ov: 2,
      rv: 2,
      conflicts: [
        "multiattack2",
        "multiattack58",
        "multiattack915",
        "multiattack1630",
        "multiattack3160",
        "multiattack61125",
      ],
    },
    {
      id: "multiattack58",
      label: "Multi-Attack on 5-8",
      ov: 3,
      rv: 3,
      conflicts: [
        "multiattack2",
        "multiattack34",
        "multiattack915",
        "multiattack1630",
        "multiattack3160",
        "multiattack61125",
      ],
    },
    {
      id: "multiattack915",
      label: "Multi-Attack on 9-15",
      ov: 4,
      rv: 4,
      conflicts: [
        "multiattack2",
        "multiattack34",
        "multiattack58",
        "multiattack1630",
        "multiattack3160",
        "multiattack61125",
      ],
    },
    {
      id: "multiattack1630",
      label: "Multi-Attack on 16-30",
      ov: 5,
      rv: 5,
      conflicts: [
        "multiattack2",
        "multiattack34",
        "multiattack58",
        "multiattack915",
        "multiattack3160",
        "multiattack61125",
      ],
    },
    {
      id: "multiattack3160",
      label: "Multi-Attack on 31-60",
      ov: 6,
      rv: 6,
      conflicts: [
        "multiattack2",
        "multiattack34",
        "multiattack58",
        "multiattack915",
        "multiattack1630",
        "multiattack61125",
      ],
    },
    {
      id: "multiattack61125",
      label: "Multi-Attack on 61-125",
      ov: 7,
      rv: 7,
      conflicts: [
        "multiattack2",
        "multiattack34",
        "multiattack58",
        "multiattack915",
        "multiattack1630",
        "multiattack3160",
      ],
    },
    {
      id: "sweep",
      label: "Sweep Attack",
      ov: -1,
      rv: -1,
    },
    {
      id: "teamattack2",
      label: "Team Attack by 2",
      ov: -1,
      rv: 0,
      conflicts: ["teamattack34", "teamattack58", "teamattack9plus"],
    },
    {
      id: "teamattack34",
      label: "Team Attack by 3-4",
      ov: -2,
      rv: 0,
      conflicts: ["teamattack2", "teamattack58", "teamattack9plus"],
    },
    {
      id: "teamattack58",
      label: "Team Attack by 5-8",
      ov: -3,
      rv: 0,
      conflicts: ["teamattack2", "teamattack34", "teamattack9plus"],
    },
    {
      id: "teamattack9plus",
      label: "Team Attack by 9+",
      ov: -4,
      rv: 0,
      conflicts: ["teamattack2", "teamattack34", "teamattack58"],
    },
    {
      id: "pullingpunch",
      label: "Pulling a Punch",
      ov: 0,
      rv: 1,
    },
    {
      id: "plannedknockback",
      label: "Planned Knockback",
      ov: 0,
      rv: 0,
    },
    {
      id: "chargingattack",
      label: "Charging Attack",
      ov: 0,
      rv: 0,
    },
    {
      id: "takeaway",
      label: "Takeaway",
      ov: 2,
      rv: 1,
    },
    {
      id: "trickshot",
      label: "Trickshot",
      ov: 2,
      minimumFlag: true,
      rv: 0,
    },
    {
      id: "blockhand",
      label: "Block (Human Hand)",
      ov: 1,
      rv: 1,
      conflicts: [
        "blocksmallshield",
        "blockgarbagecanlid",
        "blockdesksmalltable",
        "blockdoor",
        "blockautomobile",
        "blocksemitruck",
        "blockhouse",
      ],
    },
    {
      id: "blocksmallshield",
      label: "Block (Small Shield)",
      ov: 0,
      rv: 0,
      conflicts: [
        "blockhand",
        "blockgarbagecanlid",
        "blockdesksmalltable",
        "blockdoor",
        "blockautomobile",
        "blocksemitruck",
        "blockhouse",
      ],
    },
    {
      id: "blockgarbagecanlid",
      label: "Block (Garbage Can Lid)",
      ov: -1,
      rv: -1,
      conflicts: [
        "blockhand",
        "blocksmallshield",
        "blockdesksmalltable",
        "blockdoor",
        "blockautomobile",
        "blocksemitruck",
        "blockhouse",
      ],
    },
    {
      id: "blockdesksmalltable",
      label: "Block (Desk, Small Table)",
      ov: -2,
      rv: -2,
      conflicts: [
        "blockhand",
        "blocksmallshield",
        "blockgarbagecanlid",
        "blockdoor",
        "blockautomobile",
        "blocksemitruck",
        "blockhouse",
      ],
    },
    {
      id: "blockdoor",
      label: "Block (Door)",
      ov: -3,
      rv: -3,
      conflicts: [
        "blockhand",
        "blocksmallshield",
        "blockgarbagecanlid",
        "blockdesksmalltable",
        "blockautomobile",
        "blocksemitruck",
        "blockhouse",
      ],
    },
    {
      id: "blockautomobile",
      label: "Block (Automobile)",
      ov: -4,
      rv: -4,
      conflicts: [
        "blockhand",
        "blocksmallshield",
        "blockgarbagecanlid",
        "blockdesksmalltable",
        "blockdoor",
        "blocksemitruck",
        "blockhouse",
      ],
    },
    {
      id: "blocksemitruck",
      label: "Block (Semi Truck)",
      ov: -5,
      rv: -5,
      conflicts: [
        "blockhand",
        "blocksmallshield",
        "blockgarbagecanlid",
        "blockdesksmalltable",
        "blockdoor",
        "blockautomobile",
        "blockhouse",
      ],
    },
    {
      id: "blockhouse",
      label: "Block (House)",
      ov: -6,
      rv: -6,
      conflicts: [
        "blockhand",
        "blocksmallshield",
        "blockgarbagecanlid",
        "blockdesksmalltable",
        "blockdoor",
        "blockautomobile",
        "blocksemitruck",
      ],
    },
    {
      id: "dodge",
      label: "Dodge",
      ov: 1,
      rv: 0,
    },
    {
      id: "pressingattack",
      label: "Pressing The Attack",
      ov: -1,
      rv: 0,
    },
    {
      id: "layingback",
      label: "Laying Back",
      ov: +1,
      rv: 0,
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

    if (getOpposingValueIndex(OpposingValue) < 0) {
      return -1;
    }

    const opposingRollThreshold =
      StandardGroups[getOpposingValueIndex(OpposingValue)].values;

    const actionTableValue = getActionTableCellValue(
      getOpposingValueIndex(OpposingValue),
      getActingValueIndex(ActingValue)
    );

    const upwardValuesTweaked = [11, ...upwardValues].filter(
      (v) => v >= actionTableValue
    );

    const above = upwardValuesTweaked.filter(
      (v, i, a) =>
        v >= ActingRoll || (i < a.length - 1 ? ActingRoll < a[i + 1] : true)
    );

    if (ActingRoll < actionTableValue) {
      return -1;
    }

    console.log({
      OpposingValue,
      getOpposingValueIndex: getOpposingValueIndex(OpposingValue),
      opposingRollThreshold,
      actionTableValue,
      upwardValuesTweaked,
      upwardValues,
      above,
      experimentalRAPs: upwardValuesTweaked.length - above.length,
    });

    if (ActingValue > 60 || OpposingValue > 60) {
      return 9999;
    }

    return upwardValuesTweaked.length - above.length;

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
    if (RAPs === -1 || effectIndex - 1 < 0) {
      return -1;
    }

    if (ResistanceValue === 0) {
      return `A + ${RAPs} (${EffectValue + RAPs})`;
    }

    return resistanceIndex - RAPs === 0
      ? "A"
      : resistanceIndex - RAPs < 0
      ? `A + ${Math.abs(resistanceIndex - RAPs)} (${
          EffectValue + Math.abs(resistanceIndex - RAPs)
        })`
      : ResultTableGroups[effectIndex - 1].values[resistanceIndex - RAPs - 1] ??
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
            backgroundColor: StandardGroups[rowIndex + 1].values.includes(
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
            {StandardGroups[rowIndex + 1].label}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            width: "min-content",
            backgroundColor: StandardGroups[rowIndex + 1].values.includes(
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
              StandardGroups[rowIndex + 1].values.includes(EffectValue) ||
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
                StandardGroups[rowIndex + 1].values.includes(EffectValue) ||
                StandardGroups[colIndex + 1].values.includes(ResistanceValue)
                  ? StandardGroups[rowIndex + 1].values.includes(EffectValue) &&
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
                    StandardGroups[rowIndex + 1].values.includes(EffectValue) ||
                    StandardGroups[colIndex + 1].values.includes(
                      ResistanceValue
                    )
                      ? StandardGroups[rowIndex + 1].values.includes(
                          EffectValue
                        ) &&
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

  // const videos = [
  //   "/video/aquaman.webm",
  //   "/video/atomsmasher.webm",
  //   "/video/batman.webm",
  //   "/video/batman+wonderwoman.webm",
  //   "/video/blackadam.webm",
  //   "/video/blackmanta.mp4",
  //   "/video/bloodsport.webm",
  //   "/video/cyborg.webm",
  //   "/video/cyclone.webm",
  //   "/video/darkseid.webm",
  //   "/video/deadshot.webm",
  //   "/video/doctorfate.webm",
  //   "/video/flash.webm",
  //   "/video/harleyquinn.webm",
  //   "/video/hawkman.webm",
  //   "/video/katana.webm",
  //   "/video/mera.webm",
  //   "/video/rasalghul.mp4",
  //   "/video/steppenwolf.webm",
  //   "/video/superman.webm",
  //   "/video/wonderwoman.webm",
  // ];

  // const [video, setVideo] = React.useState(0);

  // const skipVideo = () => {
  //   if (video + 1 >= videos.length) {
  //     setVideo(0);
  //   } else {
  //     setVideo(video + 1);
  //   }

  //   let videoPlayer = document.getElementById("bgvid") as HTMLVideoElement;
  //   videoPlayer.src = videos[video];
  //   videoPlayer.play();
  // };

  return (
    <React.Fragment>
      <Head>
        <title>DC Heroes Tool vZ.0.1</title>
      </Head>
      <Root
        sx={{
          maxHeight: "calc(100vh - 2rem - 1px)",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.6em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            outline: "1px solid slategrey",
          },
        }}
      >
        <TitleBar />
        <div
          style={{
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
          id="bgvid"
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
          {/* <source src={videos[video]} type="video/webm" /> */}
          <source src={'/video/live_bg.webm'} type="video/webm" />
        </video>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{}}
        >
          <Stack direction="column" spacing={2}>
            {/* <Button onClick={() => skipVideo()}>Skip Video</Button> */}
            <Stack direction="column" spacing={1} width={1} p={2}>
              <Stack
                direction={{ md: "column", lg: "row" }}
                spacing={1}
                width={1}
              >
                <Paper>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={2}
                    width={1}
                    p={1}
                  >
                    <Stack
                      direction="column"
                      spacing={1}
                      sx={{ flexGrow: 1, minWidth: 500 }}
                    >
                      <Typography variant="subtitle1">
                        Combat Maneuvers (Not Implemented)
                      </Typography>
                      <FormControl>
                        <InputLabel id="combat-maneuver-label">
                          Combat Maneuvers
                        </InputLabel>
                        <Select
                          id="combat-maneuver"
                          multiple
                          value={CombatManeuvers}
                          onChange={(e) =>
                            setCombatManeuvers(
                              typeof e.target.value === "string"
                                ? e.target.value.split(",")
                                : e.target.value
                            )
                          }
                          input={<OutlinedInput label="Combat Maneuvers" />}
                          renderValue={(selected) => (
                            <Stack direction="column">
                              {selected.map((s) => (
                                <ManeuverDisplay
                                  maneuver={combatManeuvers.find(
                                    (m) => m.id === s
                                  )}
                                />
                              ))}
                            </Stack>
                          )}
                        >
                          {combatManeuvers.map((maneuver) => (
                            <MenuItem
                              key={maneuver.id}
                              value={maneuver.id}
                              disabled={
                                maneuver.conflicts &&
                                maneuver.conflicts.some((conflict) =>
                                  CombatManeuvers.includes(conflict)
                                )
                              }
                            >
                              <ManeuverDisplay maneuver={maneuver} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row"></Stack>
                    </Stack>
                  </Stack>
                </Paper>
                <Paper>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={2}
                    width={1}
                    p={1}
                  >
                    <Stack direction="column" spacing={1} sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">
                        Action Table Values
                      </Typography>
                      <TextField
                        id="ActingValue"
                        label="Acting Value"
                        type="number"
                        size="small"
                        value={ActingValue}
                        onChange={(e) =>
                          setActingValue(parseInt(e.target.value))
                        }
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
                        onChange={(e) =>
                          setActingRoll(parseInt(e.target.value))
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Stack>
                    <Stack direction="column" spacing={1} width={1}>
                      <Stack
                        direction="row"
                        spacing={6}
                        width={1}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          flex: 1,
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
                            <Typography variant="h5" gutterBottom>
                              Acting RAPs
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                              Failure
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography variant="h5" gutterBottom>
                              Acting RAPs
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                              {getActingRollRAPs()}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
                <Paper>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={2}
                    width={1}
                    p={1}
                    flex={1}
                  >
                    <Stack direction="column" spacing={1} sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">
                        Result Table Values
                      </Typography>
                      <TextField
                        id="EffectValue"
                        label="Effect Value"
                        type="number"
                        size="small"
                        value={EffectValue}
                        onChange={(e) =>
                          setEffectValue(parseInt(e.target.value))
                        }
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
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={6}
                      width={1}
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        flex: 1,
                      }}
                    >
                      {getResultRollValue() === 9999 ? (
                        <Typography variant="body2" gutterBottom color="error">
                          Error: One or more values outside of acceptable range.
                          This tool can't do this math yet, bro.
                        </Typography>
                      ) : getResultRollValue() === -1 ? (
                        <>
                          <Typography variant="h5" gutterBottom>
                            Result Value
                          </Typography>
                          <Typography variant="h4" gutterBottom>
                            Failure
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="h5" gutterBottom>
                            Result Value
                          </Typography>
                          <Typography variant="h4" gutterBottom>
                            {getResultRollValue()}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
            <Stack direction={{ md: "column", lg: "row" }} spacing={1}>
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
        </Stack>
      </Root>
    </React.Fragment>
  );
}

export default Home;
const ManeuverDisplay = ({ maneuver }: { maneuver: CombatManeuver }) => {
  return (
    <Stack direction="row" width={1} justifyContent="space-between">
      <Typography variant="body1">
        {maneuver.label}
        {maneuver?.minimumFlag && <i>&nbsp;minimum</i>}
      </Typography>
      <Stack direction="row" spacing={6}>
        <Typography variant="body1">
          <small>OV:</small> {maneuver.ov < 0 ? "" : "+"}
          {maneuver.ov}
        </Typography>
        <Typography variant="body1">
          <small>RV:</small> {maneuver.rv < 0 ? "" : "+"}
          {maneuver.rv}
        </Typography>
      </Stack>
    </Stack>
  );
};
