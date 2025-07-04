"use client";
import React from "react";
import { Tabs } from "@mantine/core";

import Matrix from "./Matrix";
import Notes from "./Notes";
import styles from "./Managent.module.css"; // 👈 Import CSS Module

export default function Managent() {
  return (
    <div className={styles.box}>
    <Tabs
      variant="outline"
      radius="xs"
      defaultValue="Matrix"
      classNames={{
        tab: styles.customTab,
      }}
    >
      <h1 className={styles.heading}>Highrise Melbourne</h1>

      <Tabs.List>
        <Tabs.Tab value="Matrix">Matrix</Tabs.Tab>
        <Tabs.Tab value="Notes">Notes</Tabs.Tab>
        <Tabs.Tab value="Documents">Documents</Tabs.Tab>
        <Tabs.Tab value="Price List">Price List</Tabs.Tab>
        <Tabs.Tab value="CRM">CRM</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Matrix">
        <Matrix />
      </Tabs.Panel>
      <Tabs.Panel value="Notes">
        <Notes />
      </Tabs.Panel>
      <Tabs.Panel value="Documents">Settings tab content</Tabs.Panel>
      <Tabs.Panel value="Price List">Price List</Tabs.Panel>
      <Tabs.Panel value="CRM">CRM</Tabs.Panel>
    </Tabs>
    </div>

  );
}
