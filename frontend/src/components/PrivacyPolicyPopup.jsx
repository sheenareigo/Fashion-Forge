import React from 'react';
import { Box, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

const PrivacyPolicyPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5}>
            <Text fontSize="lg" mb={6}>Effective Date: [Insert Effective Date]</Text>

            <Text fontSize="xl" mb={4}>Introduction</Text>
            <Text mb={6}>
              Welcome to FashionForge, your premier online destination for men's, women's, and kids' summer and winter clothing collections. At FashionForge, we are committed to protecting your privacy and ensuring that your personal information is handled with care and respect. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to safeguard your data.
            </Text>

            <Text fontSize="xl" mb={4}>Information We Collect</Text>
            <Text mb={2}><strong>1. Personal Information:</strong></Text>
            <Text mb={2}>- Name</Text>
            <Text mb={2}>- Email Address</Text>
            <Text mb={2}>- Phone Number</Text>
            <Text mb={2}>- Shipping Address</Text>
            <Text mb={2}>- Billing Address</Text>
            <Text mb={6}>- Payment Information (including credit/debit card details)</Text>

            <Text mb={2}><strong>2. Account Information:</strong></Text>
            <Text mb={2}>- Username</Text>
            <Text mb={6}>- Password</Text>

            <Text mb={2}><strong>3. Order Information:</strong></Text>
            <Text mb={2}>- Products purchased</Text>
            <Text mb={2}>- Order number</Text>
            <Text mb={6}>- Order date and time</Text>

            <Text mb={2}><strong>4. Technical Information:</strong></Text>
            <Text mb={2}>- IP Address</Text>
            <Text mb={2}>- Browser Type and Version</Text>
            <Text mb={2}>- Device Information</Text>
            <Text mb={6}>- Operating System</Text>

            <Text mb={2}><strong>5. Usage Information:</strong></Text>
            <Text mb={2}>- Pages visited</Text>
            <Text mb={2}>- Time spent on the website</Text>
            <Text mb={6}>- Links clicked</Text>
            <Text mb={6}>- User interactions</Text>

            <Text mb={2}><strong>6. Marketing Information:</strong></Text>
            <Text mb={2}>- Preferences and interests</Text>
            <Text mb={2}>- Survey responses</Text>
            <Text mb={6}>- Marketing and communication preferences</Text>

            <Text fontSize="xl" mb={4}>How We Use Your Information</Text>
            <Text mb={2}><strong>1. To Process and Fulfill Orders:</strong></Text>
            <Text mb={2}>- Ensure accurate delivery of products</Text>
            <Text mb={2}>- Process payments</Text>
            <Text mb={6}>- Communicate order status and updates</Text>

            <Text mb={2}><strong>2. To Provide Customer Support:</strong></Text>
            <Text mb={2}>- Respond to inquiries and support requests</Text>
            <Text mb={6}>- Address issues and complaints</Text>

            <Text mb={2}><strong>3. To Improve Our Services:</strong></Text>
            <Text mb={2}>- Analyze website usage and performance</Text>
            <Text mb={6}>- Enhance user experience</Text>
            <Text mb={6}>- Develop new features and products</Text>

            <Text mb={2}><strong>4. To Conduct Marketing and Promotions:</strong></Text>
            <Text mb={2}>- Send promotional emails and newsletters (with your consent)</Text>
            <Text mb={2}>- Inform you of special offers and discounts</Text>
            <Text mb={6}>- Conduct surveys and gather feedback</Text>

            <Text mb={2}><strong>5. For Security and Fraud Prevention:</strong></Text>
            <Text mb={2}>- Monitor and protect against fraudulent activities</Text>
            <Text mb={6}>- Ensure website and user data security</Text>

            <Text mb={2}><strong>6. To Comply with Legal Obligations:</strong></Text>
            <Text mb={2}>- Adhere to applicable laws and regulations</Text>
            <Text mb={6}>- Respond to legal requests and prevent harm</Text>

            <Text fontSize="xl" mb={4}>How We Share Your Information</Text>
            <Text mb={6}>FashionForge does not sell, trade, or rent your personal information to third parties. We may share your information with:</Text>

            <Text mb={2}><strong>1. Service Providers:</strong></Text>
            <Text mb={2}>- Payment processors</Text>
            <Text mb={2}>- Shipping and logistics companies</Text>
            <Text mb={2}>- Email marketing platforms</Text>
            <Text mb={6}>- Analytics providers</Text>

            <Text mb={2}><strong>2. Legal and Regulatory Authorities:</strong></Text>
            <Text mb={6}>- To comply with legal requirements and protect our rights</Text>

            <Text fontSize="xl" mb={4}>Cookies and Tracking Technologies</Text>
            <Text mb={6}>FashionForge uses cookies and similar tracking technologies to enhance your browsing experience and gather information about website usage. You can manage your cookie preferences through your browser settings.</Text>

            <Text fontSize="xl" mb={4}>Data Security</Text>
            <Text mb={6}>We implement a variety of security measures to maintain the safety of your personal information. These measures include:</Text>

            <Text mb={2}>- Encryption of sensitive data during transmission</Text>
            <Text mb={2}>- Secure storage of payment information</Text>
            <Text mb={2}>- Access controls to restrict unauthorized access</Text>
            <Text mb={6}>- Regular security assessments and updates</Text>

            <Text fontSize="xl" mb={4}>Data Retention</Text>
            <Text mb={6}>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with our legal obligations, resolve disputes, and enforce our agreements.</Text>

            <Text fontSize="xl" mb={4}>Your Rights</Text>
            <Text mb={6}>You have the right to:</Text>

            <Text mb={2}>- Access your personal information</Text>
            <Text mb={2}>- Rectify incorrect or incomplete data</Text>
            <Text mb={2}>- Request deletion of your data (subject to legal obligations)</Text>
            <Text mb={2}>- Object to processing of your data</Text>
            <Text mb={6}>- Withdraw consent at any time</Text>

            <Text mb={6}>To exercise these rights, please contact us using the information provided below.</Text>

            <Text fontSize="xl" mb={4}>Changes to This Privacy Policy</Text>
            <Text mb={6}>FashionForge reserves the right to update this Privacy Policy at any time. We will notify you of any significant changes by posting the new policy on our website and updating the effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.</Text>

            <Text fontSize="xl" mb={4}>Contact Us</Text>
            <Text mb={6}>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</Text>

            <Text mb={2}><strong>FashionForge Customer Support</strong></Text>
            <Text mb={2}>Email: fashionforgeservices@gmail.com</Text>
            <Text mb={2}>Phone: +1-533-345-3400</Text>
            <Text mb={6}>Address: 32 Burlington New York US</Text>

            <Text>This Privacy Policy was last updated on 18th July 2024.</Text>
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

export default PrivacyPolicyPopup;
