"use client";
import React from "react";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import Matrix from "./Matrix";
import Notes from "./Notes";

export default function Managent() {  // Dùng default export
  return (
    <Tabs variant="outline" radius="xs" defaultValue="Matrix">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: '#294b61' }}>
  Highrise Melbourne
</h1>

      <Tabs.List>
        <Tabs.Tab value="Matrix"  >
          Matrix
        </Tabs.Tab>
        <Tabs.Tab value="Notes"  >
          Notes
        </Tabs.Tab>
        <Tabs.Tab value="Documents"  >
          Documents
        </Tabs.Tab>
         <Tabs.Tab value="Price List"  >
         Price List
        </Tabs.Tab>
         <Tabs.Tab value="CRM"  >
         CRM
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Matrix">
        <Matrix/>
      </Tabs.Panel>

      <Tabs.Panel value="Notes">
        <Notes/>
      </Tabs.Panel>

      <Tabs.Panel value="Documents">
        Settings tab content
      </Tabs.Panel>
       <Tabs.Panel value="Price List">
      "Price List
      </Tabs.Panel>
       <Tabs.Panel value="CRM">
       CRM
      </Tabs.Panel>
      
    </Tabs>
  );
}
