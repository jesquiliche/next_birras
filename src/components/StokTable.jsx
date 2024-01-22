'use client'
import React from "react";
//import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

const DataTableStock = ({ data }) => (
  <Card>
    <Title className="font-bold text-md md:text-2xl text-center">Stock</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="font-bold">Nombre</TableHeaderCell>
          <TableHeaderCell  className="font-bold">Stock</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Badge color="emerald">
                {item.value}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default DataTableStock;
