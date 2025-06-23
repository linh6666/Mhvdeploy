import React, { useState } from "react";
import { Title, Flex, Modal, Button, Text } from "@mantine/core";
import ApartmentCard, { ApartmentProps } from "./ApartmentCard";

const apartments: ApartmentProps[] = [
  {
    id: "Apt0101",
    floor: 1,
    bedrooms: 0,
    bathrooms: 0,
    price: 1,
    status: "available",
  },
  {
    id: "Apt0201",
    floor: 2,
    bedrooms: 0,
    bathrooms: 0,
    price: 1250000,
    status: "deposit",
  },
];

export default function App() {
  const [opened, setOpened] = useState(false);  // State to control the modal visibility
  const [selectedApartment, setSelectedApartment] = useState<ApartmentProps | null>(null); // Store the selected apartment details

  const openModal = (apartment: ApartmentProps) => {
    setSelectedApartment(apartment);  // Set the selected apartment details
    setOpened(true);  // Open the modal
  };

  const closeModal = () => {
    setOpened(false);  // Close the modal
    setSelectedApartment(null);  // Clear selected apartment details
  };

  return (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      {[1, 2].map((floor) => (
        <div key={floor} style={{ marginBottom: "1.5rem" }}>
          <Title order={3} style={{ color: "var(--mantine-color-gray-8)" }}>
            Floor {floor}
          </Title>

          <Flex direction="column" gap={8} mt={8}>
            {apartments
              .filter((apt) => apt.floor === floor)
              .map((apartment) => (
                <div key={apartment.id} onClick={() => openModal(apartment)}>
                  <ApartmentCard {...apartment} />
                </div>
              ))}
          </Flex>
        </div>
      ))}

      {/* Modal component */}
      <Modal
        opened={opened}
        onClose={closeModal}
        title={`Apartment Details: ${selectedApartment?.id}`}
      >
        {selectedApartment && (
          <>
            <Text>Floor: {selectedApartment.floor}</Text>
            <Text>Bedrooms: {selectedApartment.bedrooms}</Text>
            <Text>Bathrooms: {selectedApartment.bathrooms}</Text>
            <Text>Price: {selectedApartment.price}</Text>
            <Text>Status: {selectedApartment.status}</Text>
            <Button onClick={closeModal} style={{ marginTop: "1rem" }}>
              Close
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
}


