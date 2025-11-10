import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Content_Screens = ({ route, navigation }) => {
    const { page } = route.params || {}; // get which page to show

    // Map page param to content
    const contentMap = {
        FAQ: {
            title: 'Frequently Asked Questions',
            sections: [
                {
                    question: 'How do I get started?',
                    answer: 'Simply download the app, create an account, and follow the onboarding process. You\'ll be up and running in minutes!'
                },
                {
                    question: 'Is my data secure?',
                    answer: 'Yes, we use industry-standard encryption to protect your data. All information is stored securely and we never share your personal information with third parties without your consent.'
                },
                {
                    question: 'How do I reset my password?',
                    answer: 'Go to Settings > Account > Reset Password. You\'ll receive an email with instructions to create a new password.'
                },
                {
                    question: 'Can I use this app offline?',
                    answer: 'Yes, many features work offline. Your data will sync automatically when you reconnect to the internet.'
                },
                {
                    question: 'How do I contact support?',
                    answer: 'You can reach our support team through the app by going to Settings > Help & Support, or email us at support@example.com.'
                }
            ]
        },
        PrivacyPolicy: {
            title: 'Privacy Policy',
            content: `Last updated: November 2025

1. Information We Collect
We collect information you provide directly to us, including name, email address, and usage data.

2. How We Use Your Information
- To provide and maintain our service
- To notify you about changes to our service
- To provide customer support
- To gather analysis or valuable information to improve our service
- To monitor the usage of our service
- To detect, prevent and address technical issues

3. Data Security
We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

4. Third-Party Services
We may employ third-party companies and individuals to facilitate our service. These third parties have access to your personal information only to perform tasks on our behalf.

5. Children's Privacy
Our service does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13.

6. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

7. Contact Us
If you have any questions about this Privacy Policy, please contact us at privacy@example.com.`
        },
        About: {
            title: 'About Us',
            content: `Welcome to Our App!

Our Mission
We are dedicated to providing the best user experience through innovative solutions and exceptional service. Our team works tirelessly to ensure that every feature meets the highest standards of quality.

Who We Are
Founded in 2020, we've grown from a small startup to a trusted platform serving thousands of users worldwide. Our diverse team brings together expertise in technology, design, and customer service.

What We Do
We create powerful, user-friendly tools that help people accomplish their goals more efficiently. Our focus is on:
- Innovation and continuous improvement
- User privacy and data security
- Exceptional customer support
- Accessible design for everyone

Our Values
- Integrity: We believe in transparency and honest communication
- Excellence: We strive for the highest quality in everything we do
- Community: We value our users and listen to their feedback
- Innovation: We constantly evolve to meet changing needs

Get in Touch
We'd love to hear from you! Reach out at contact@example.com or follow us on social media for updates and news.`
        },
        TermsConditions: {
            title: 'Terms & Conditions',
            content: `Last updated: November 2025

Please read these Terms and Conditions carefully before using our service.

1. Agreement to Terms
By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.

2. Use License
Permission is granted to temporarily use our service for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.

You may not:
- Modify or copy the materials
- Use the materials for commercial purposes
- Attempt to decompile or reverse engineer any software
- Remove any copyright or proprietary notations
- Transfer the materials to another person

3. User Accounts
When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.

4. Prohibited Activities
You agree not to:
- Violate any laws or regulations
- Infringe on intellectual property rights
- Transmit harmful or malicious code
- Harass or harm other users
- Spam or send unsolicited messages

5. Intellectual Property
The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.

6. Termination
We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms.

7. Limitation of Liability
In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.

8. Changes to Terms
We reserve the right to modify these terms at any time. We will notify users of any material changes.

9. Governing Law
These Terms shall be governed by and construed in accordance with applicable laws.

10. Contact Information
For questions about these Terms, contact us at legal@example.com.`
        }
    };

    const pageData = contentMap[page];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EA580C' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                {/* Header */}
                <LinearGradient colors={['#EA580C', '#F59E0B']} style={styles.header}>
                    {/* <View style={styles.header}> */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{pageData?.title || page}</Text>
                    <View style={styles.placeholder} />
                    {/* </View> */}
                </LinearGradient>

                {/* Content */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {page === 'FAQ' ? (
                        // FAQ specific layout
                        pageData.sections.map((item, index) => (
                            <View key={index} style={styles.faqItem}>
                                <Text style={styles.question}>Q: {item.question}</Text>
                                <Text style={styles.answer}>A: {item.answer}</Text>
                            </View>
                        ))
                    ) : (
                        // Other pages with regular content
                        <Text style={styles.content}>{pageData?.content}</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Content_Screens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        color: '#ffffffff',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 8, fontFamily: "Lato-Bold"
    },
    placeholder: {
        width: 32, // Same width as back button for centering
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    content: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24, fontFamily: "Lato-Regular"
    },
    faqItem: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#007AFF',
    },
    question: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8, fontFamily: "Lato-Bold"
    },
    answer: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22, fontFamily: "Lato-Regular"
    },
});