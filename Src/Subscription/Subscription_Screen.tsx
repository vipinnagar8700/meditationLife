import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Subscription_Screen = ({ navigation }) => {
    const [selectedPlan, setSelectedPlan] = useState('yearly')
    const [loading, setLoading] = useState(false)

    // Razorpay Configuration
    const RAZORPAY_KEY = 'rzp_test_p5iNVFaR4ofguv' // Replace with your actual Razorpay key

    const plans = [
        {
            id: 'monthly',
            name: 'Monthly',
            price: '$9.99',
            priceInr: '₹799',
            amount: 79900, // Amount in paise (₹799)
            period: '/month',
            description: 'Billed monthly',
            savings: null,
            features: [
                'Unlimited meditation sessions',
                'Access to all content',
                'HD audio quality',
                'Cancel anytime',
            ]
        },
        {
            id: 'yearly',
            name: 'Yearly',
            price: '$79.99',
            priceInr: '₹6,499',
            amount: 649900, // Amount in paise (₹6,499)
            period: '/year',
            description: 'Billed annually',
            savings: 'Save 33%',
            popular: true,
            features: [
                'Everything in Monthly',
                'Exclusive yearly content',
                'Priority support',
                'Offline downloads',
                'Family sharing (up to 5)',
            ]
        },
        {
            id: 'lifetime',
            name: 'Lifetime',
            price: '$199.99',
            priceInr: '₹16,499',
            amount: 1649900, // Amount in paise (₹16,499)
            period: 'one-time',
            description: 'Pay once, own forever',
            savings: 'Best Value',
            features: [
                'Everything in Yearly',
                'Lifetime access',
                'All future updates',
                'VIP support',
                'Early access to new features',
            ]
        }
    ]

    const premiumFeatures = [
        { icon: 'infinite', title: 'Unlimited Access', desc: 'Access all meditation sessions' },
        { icon: 'download-outline', title: 'Offline Mode', desc: 'Download and listen anywhere' },
        { icon: 'people-outline', title: 'Family Sharing', desc: 'Share with up to 5 members' },
        { icon: 'musical-notes-outline', title: 'Premium Content', desc: 'Exclusive sessions & music' },
        { icon: 'stats-chart-outline', title: 'Advanced Stats', desc: 'Track your progress in detail' },
        { icon: 'notifications-off-outline', title: 'Ad-Free', desc: 'Enjoy without interruptions' },
    ]

    // Handle Razorpay Payment (Frontend Only)
    const handleSubscribe = async () => {
        const plan = plans.find(p => p.id === selectedPlan)
        setLoading(true)

        try {
            // Create HTML page with Razorpay Checkout
            const razorpayHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #E8624E 0%, #F3A469 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 100%;
            animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .icon {
            font-size: 60px;
            margin-bottom: 20px;
        }
        h1 {
            background: linear-gradient(135deg, #E8624E 0%, #F3A469 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .plan-name {
            color: #666;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .amount {
            font-size: 48px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
        }
        .period {
            color: #999;
            font-size: 14px;
            margin-bottom: 30px;
        }
        button {
            background: linear-gradient(135deg, #E8624E 0%, #F3A469 100%);
            color: white;
            border: none;
            padding: 16px 50px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(232, 98, 78, 0.4);
            transition: all 0.3s;
            width: 100%;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(232, 98, 78, 0.5);
        }
        button:active {
            transform: translateY(0);
        }
        .secure-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
            color: #4CAF50;
            font-size: 13px;
        }
        .payment-methods {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
        }
        .loading {
            display: none;
            text-align: center;
            color: #666;
            margin-top: 20px;
        }
        .loading.active {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🧘</div>
        <h1>Meditation Life</h1>
        <p class="plan-name">${plan.name} Subscription</p>
        <div class="amount">₹${(plan.amount / 100).toFixed(0)}</div>
        <p class="period">${plan.period}</p>
        <button onclick="startPayment()" id="payBtn">
            🔒 Proceed to Payment
        </button>
        <div class="secure-badge">
            <span>🔒</span>
            <span>Secured by Razorpay</span>
        </div>
        <div class="payment-methods">
            💳 Cards • 🏦 Net Banking • 📱 UPI • 💰 Wallets
        </div>
        <div class="loading" id="loading">
            Processing your payment...
        </div>
    </div>

    <script>
        function startPayment() {
            document.getElementById('payBtn').disabled = true;
            document.getElementById('loading').classList.add('active');
            
            var options = {
                "key": "${RAZORPAY_KEY}",
                "amount": ${plan.amount},
                "currency": "INR",
                "name": "Meditation Life",
                "description": "${plan.name} Subscription",
                "image": "https://cdn-icons-png.flaticon.com/512/2748/2748558.png",
                "prefill": {
                    "name": "User",
                    "email": "user@example.com",
                    "contact": "9999999999"
                },
                "theme": {
                    "color": "#E8624E"
                },
                "handler": function (response) {
                    // Payment successful
                    document.querySelector('.container').innerHTML = \`
                        <div style="padding: 40px 0;">
                            <div style="font-size: 80px; margin-bottom: 20px;">✅</div>
                            <h1 style="color: #4CAF50; margin-bottom: 15px;">Payment Successful!</h1>
                            <p style="color: #666; margin-bottom: 10px;">Payment ID: \${response.razorpay_payment_id}</p>
                            <p style="color: #666; font-size: 14px; margin-top: 20px;">Your ${plan.name} subscription is now active!</p>
                            <p style="color: #999; font-size: 12px; margin-top: 30px;">You can close this window and return to the app</p>
                        </div>
                    \`;
                    
                    // Auto close after 3 seconds
                    setTimeout(function() {
                        window.close();
                    }, 3000);
                },
                "modal": {
                    "ondismiss": function() {
                        document.querySelector('.container').innerHTML = \`
                            <div style="padding: 40px 0;">
                                <div style="font-size: 80px; margin-bottom: 20px;">❌</div>
                                <h1 style="color: #E8624E; margin-bottom: 15px;">Payment Cancelled</h1>
                                <p style="color: #666; margin-bottom: 30px;">Your payment was cancelled.</p>
                                <button onclick="location.reload()" style="background: linear-gradient(135deg, #E8624E 0%, #F3A469 100%); color: white; border: none; padding: 14px 30px; border-radius: 50px; font-size: 16px; cursor: pointer;">
                                    Try Again
                                </button>
                                <p style="color: #999; font-size: 12px; margin-top: 20px;">Or close this window to return to the app</p>
                            </div>
                        \`;
                    }
                }
            };
            
            var rzp = new Razorpay(options);
            
            rzp.on('payment.failed', function (response){
                document.querySelector('.container').innerHTML = \`
                    <div style="padding: 40px 0;">
                        <div style="font-size: 80px; margin-bottom: 20px;">⚠️</div>
                        <h1 style="color: #E8624E; margin-bottom: 15px;">Payment Failed</h1>
                        <p style="color: #666; margin-bottom: 10px;">\${response.error.description}</p>
                        <p style="color: #999; font-size: 13px; margin-bottom: 30px;">Reason: \${response.error.reason}</p>
                        <button onclick="location.reload()" style="background: linear-gradient(135deg, #E8624E 0%, #F3A469 100%); color: white; border: none; padding: 14px 30px; border-radius: 50px; font-size: 16px; cursor: pointer;">
                            Try Again
                        </button>
                    </div>
                \`;
            });
            
            rzp.open();
        }
        
        // Auto-start payment after 1 second
        setTimeout(function() {
            startPayment();
        }, 1000);
    </script>
</body>
</html>
            `

            // Convert to base64 and open
            const base64HTML = btoa(unescape(encodeURIComponent(razorpayHTML)))
            const dataUrl = `data:text/html;base64,${base64HTML}`

            // Open in WebBrowser
            await WebBrowser.openBrowserAsync(dataUrl, {
                dismissButtonStyle: 'close',
                toolbarColor: '#E8624E',
                controlsColor: '#ffffff',
            })

            setLoading(false)

            // Show success message when browser closes
            Alert.alert(
                'Payment Status',
                'If your payment was successful, your subscription will be activated shortly.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            )

        } catch (error) {
            setLoading(false)
            Alert.alert('Error', 'Failed to open payment page. Please try again.')
            console.error('Payment error:', error)
        }
    }

    const handleRestore = () => {
        Alert.alert('Restore Purchases', 'Checking for previous purchases...', [{ text: 'OK' }])
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E8624E', '#F3A469']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Premium Plans</Text>
                <TouchableOpacity
                    style={styles.restoreButton}
                    onPress={handleRestore}
                >
                    <Ionicons name="refresh" size={24} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.crownContainer}>
                        <LinearGradient
                            colors={['#E8624E', '#F3A469']}
                            style={styles.crownGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="diamond" size={40} color="#fff" />
                        </LinearGradient>
                    </View>
                    <Text style={styles.heroTitle}>Unlock Premium</Text>
                    <Text style={styles.heroSubtitle}>Transform your meditation journey with unlimited access</Text>
                </View>

                {/* Premium Features Grid */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>PREMIUM FEATURES</Text>
                    <View style={styles.featuresGrid}>
                        {premiumFeatures.map((feature, index) => (
                            <View key={index} style={styles.featureCard}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name={feature.icon} size={24} color="#E8624E" />
                                </View>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDesc}>{feature.desc}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Subscription Plans */}
                <View style={styles.plansSection}>
                    <Text style={styles.sectionTitle}>CHOOSE YOUR PLAN</Text>
                    {plans.map((plan) => (
                        <TouchableOpacity
                            key={plan.id}
                            style={[
                                styles.planCard,
                                selectedPlan === plan.id && styles.planCardSelected
                            ]}
                            onPress={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <View style={styles.popularBadge}>
                                    <LinearGradient
                                        colors={['#E8624E', '#F3A469']}
                                        style={styles.popularGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Ionicons name="star" size={14} color="#fff" />
                                        <Text style={styles.popularText}>MOST POPULAR</Text>
                                    </LinearGradient>
                                </View>
                            )}

                            <View style={styles.planHeader}>
                                <View style={styles.planLeft}>
                                    <View style={styles.radioButton}>
                                        {selectedPlan === plan.id && (
                                            <LinearGradient
                                                colors={['#E8624E', '#F3A469']}
                                                style={styles.radioInner}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                            />
                                        )}
                                    </View>
                                    <View>
                                        <View style={styles.planTitleRow}>
                                            <Text style={styles.planName}>{plan.name}</Text>
                                            {plan.savings && (
                                                <View style={styles.savingsBadge}>
                                                    <Text style={styles.savingsText}>{plan.savings}</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.planDescription}>{plan.description}</Text>
                                    </View>
                                </View>
                                <View style={styles.planRight}>
                                    <Text style={styles.planPrice}>{plan.priceInr}</Text>
                                    <Text style={styles.planPeriod}>{plan.period}</Text>
                                </View>
                            </View>

                            <View style={styles.planFeatures}>
                                {plan.features.map((feature, index) => (
                                    <View key={index} style={styles.featureRow}>
                                        <Ionicons name="checkmark-circle" size={18} color="#E8624E" />
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                ))}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Subscribe Button */}
                <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={handleSubscribe}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#E8624E', '#F3A469']}
                        style={styles.subscribeGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {loading ? (
                            <Text style={styles.subscribeText}>Opening Payment...</Text>
                        ) : (
                            <>
                                <Ionicons name="lock-open" size={24} color="#fff" />
                                <Text style={styles.subscribeText}>Pay with Razorpay</Text>
                            </>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {/* Payment Methods */}
                <View style={styles.paymentMethodsSection}>
                    <Text style={styles.paymentMethodsTitle}>🔒 Secure Payment via Razorpay</Text>
                    <View style={styles.paymentMethodsRow}>
                        <Text style={styles.paymentMethodText}>💳 Cards</Text>
                        <Text style={styles.paymentMethodText}>🏦 Banking</Text>
                        <Text style={styles.paymentMethodText}>📱 UPI</Text>
                        <Text style={styles.paymentMethodText}>💰 Wallets</Text>
                    </View>
                    <Text style={styles.expoNote}>✅ No Backend Required • Works with Expo Go</Text>
                </View>

                {/* Terms */}
                <View style={styles.termsSection}>
                    <Text style={styles.termsText}>
                        Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.
                    </Text>
                    <View style={styles.termsLinks}>
                        <TouchableOpacity>
                            <Text style={styles.termsLink}>Terms of Service</Text>
                        </TouchableOpacity>
                        <Text style={styles.termsDivider}>•</Text>
                        <TouchableOpacity>
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <Text style={styles.termsDivider}>•</Text>
                        <TouchableOpacity onPress={handleRestore}>
                            <Text style={styles.termsLink}>Restore Purchase</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Join thousands of premium members</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Subscription_Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    restoreButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    crownContainer: {
        marginBottom: 20,
        borderRadius: 40,
        overflow: 'hidden',
    },
    crownGradient: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    featuresSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#F3A469',
        marginBottom: 15,
        letterSpacing: 1,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: '48%',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    featureIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(232, 98, 78, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    featureDesc: {
        fontSize: 12,
        color: '#999',
        lineHeight: 16,
    },
    plansSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    planCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#2a2a2a',
        position: 'relative',
    },
    planCardSelected: {
        borderColor: '#E8624E',
        backgroundColor: 'rgba(232, 98, 78, 0.05)',
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    popularGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 4,
    },
    popularText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#fff',
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    planLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E8624E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    planTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    planName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    savingsBadge: {
        backgroundColor: 'rgba(232, 98, 78, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    savingsText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#F3A469',
    },
    planDescription: {
        fontSize: 14,
        color: '#999',
    },
    planRight: {
        alignItems: 'flex-end',
    },
    planPrice: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
    },
    planPeriod: {
        fontSize: 14,
        color: '#999',
    },
    planFeatures: {
        gap: 8,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    featureText: {
        fontSize: 14,
        color: '#ccc',
        flex: 1,
    },
    subscribeButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    subscribeGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 10,
    },
    subscribeText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    paymentMethodsSection: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    paymentMethodsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#F3A469',
        marginBottom: 12,
        textAlign: 'center',
    },
    paymentMethodsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: 8,
        marginBottom: 12,
    },
    paymentMethodText: {
        fontSize: 12,
        color: '#ccc',
    },
    expoNote: {
        fontSize: 11,
        color: '#4CAF50',
        textAlign: 'center',
        marginTop: 8,
    },
    termsSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    termsText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 12,
    },
    termsLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    termsLink: {
        fontSize: 12,
        color: '#F3A469',
        textDecorationLine: 'underline',
    },
    termsDivider: {
        fontSize: 12,
        color: '#666',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
})