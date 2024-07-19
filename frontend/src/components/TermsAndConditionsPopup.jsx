import React from 'react';
import { Box, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

const TermsAndConditionsPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms and Conditions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5}>
            <Text fontSize="lg" mb={6}>Effective Date: [Insert Effective Date]</Text>

            <Text fontSize="xl" mb={4}>1. Introduction</Text>
            <Text mb={6}>
              Welcome to FashionForge! These Terms and Conditions govern your use of our website, products, and services. By accessing or using FashionForge, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our services.
            </Text>

            <Text fontSize="xl" mb={4}>2. Changes to Terms</Text>
            <Text mb={6}>
              FashionForge reserves the right to update or modify these Terms and Conditions at any time without prior notice. Any changes will be posted on this page, and your continued use of the website following the posting of changes constitutes your acceptance of such changes.
            </Text>

            <Text fontSize="xl" mb={4}>3. Account Registration</Text>
            <Text mb={6}>
              To access certain features of our website, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to update your information as necessary to keep it accurate and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </Text>

            <Text fontSize="xl" mb={4}>4. Products and Services</Text>
            <Text mb={6}>
              FashionForge offers a range of clothing products and related services. We strive to ensure that all descriptions and prices of products on our website are accurate. However, we cannot guarantee that all information is error-free. We reserve the right to correct any errors and to update product information and pricing at our discretion.
            </Text>

            <Text fontSize="xl" mb={4}>5. Orders and Payments</Text>
            <Text mb={6}>
              By placing an order with FashionForge, you agree to purchase the products in accordance with the terms specified at the time of purchase. All payments must be made through the payment methods provided on our website. Prices are subject to change, and we reserve the right to refuse or cancel any order at our discretion.
            </Text>

            <Text fontSize="xl" mb={4}>6. Shipping and Delivery</Text>
            <Text mb={6}>
              FashionForge will make reasonable efforts to process and ship orders promptly. Delivery times are estimates and may vary based on factors such as location and shipping method. We are not liable for any delays or issues that occur during the shipping process.
            </Text>

            <Text fontSize="xl" mb={4}>7. Returns and Exchanges</Text>
            <Text mb={6}>
              Our return and exchange policy allows you to return or exchange products within a specified period. Please refer to our [Return and Exchange Policy](#) for detailed information on eligibility, procedures, and conditions.
            </Text>

            <Text fontSize="xl" mb={4}>8. Intellectual Property</Text>
            <Text mb={6}>
              All content on the FashionForge website, including text, images, logos, and trademarks, is the property of FashionForge or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or use any content from our website without our prior written consent.
            </Text>

            <Text fontSize="xl" mb={4}>9. User Conduct</Text>
            <Text mb={6}>
              You agree to use the FashionForge website and services in a lawful manner and in accordance with these Terms and Conditions. You are prohibited from engaging in any activities that may disrupt or interfere with the functionality of our website or harm other users.
            </Text>

            <Text fontSize="xl" mb={4}>10. Limitation of Liability</Text>
            <Text mb={6}>
              To the fullest extent permitted by law, FashionForge is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services. Our liability is limited to the maximum extent permitted by applicable law.
            </Text>

            <Text fontSize="xl" mb={4}>11. Indemnification</Text>
            <Text mb={6}>
              You agree to indemnify and hold FashionForge, its affiliates, and their respective officers, directors, employees, and agents harmless from any claims, liabilities, damages, losses, and expenses arising out of your use of our website or services, or your violation of these Terms and Conditions.
            </Text>

            <Text fontSize="xl" mb={4}>12. Governing Law</Text>
            <Text mb={6}>
              These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
            </Text>

            <Text fontSize="xl" mb={4}>13. Contact Information</Text>
            <Text mb={6}>
              If you have any questions or concerns about these Terms and Conditions, please contact us at:
            </Text>
            <Text mb={2}><strong>FashionForge Customer Support</strong></Text>
            <Text mb={2}>Email: fashionforgeservices@gmail.com</Text>
            <Text mb={2}>Phone: +1-533-345-3400</Text>
            <Text mb={6}>Address: 32 Burlington New York US</Text>

            <Text mb={6}>14. Miscellaneous</Text>
            <Text mb={6}>
              If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. These Terms and Conditions constitute the entire agreement between you and FashionForge regarding your use of our website and services.
            </Text>

            <Text>This Terms and Conditions was last updated on 18th July 2024.</Text>
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

export default TermsAndConditionsPopup;
