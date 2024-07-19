import React from 'react';
import { Box, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

const ReturnPolicyPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Return Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5}>
            <Text fontSize="lg" mb={6}>Effective Date: 18th July 2024</Text>

            <Text fontSize="xl" mb={4}>Return and Refund Policy</Text>
            <Text mb={6}>
              At FashionForge, we strive to provide high-quality products and exceptional customer service. However, please be aware that all sales are final. We do not accept returns or provide refunds for items sold. By completing a purchase, you agree to this policy.
            </Text>

            <Text mb={6}>
              If you have any questions or concerns about your order or our policies, please contact us at:
            </Text>

            <Text mb={2}><strong>FashionForge Customer Support</strong></Text>
            <Text mb={2}>Email: fashionforgeservices@gmail.com</Text>
            <Text mb={2}>Phone: +1-533-345-3400</Text>
            <Text mb={6}>Address: 32 Burlington New York US</Text>


            <Text>This Return Policy was last updated on 18th July 2024.</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReturnPolicyPopup;
