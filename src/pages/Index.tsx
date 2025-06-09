import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Star, Users, TrendingUp, Clock, ChevronRight, Globe, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const translations = {
  en: {
    hero: {
      headline: "Get 200+ Verified Local Business Leads Weekly",
      subtext: "Stop wasting time on cold calling. Get qualified leads that actually convert in Turkey, Europe, and Arab markets.",
      cta: "Start Free Trial"
    },
    benefits: {
      title: "Why Choose NexaLeads?",
      benefit1: {
        title: "Verified Quality Leads",
        description: "Every lead is manually verified with contact details, ensuring 95% accuracy rate"
      },
      benefit2: {
        title: "Local Market Expertise",
        description: "Deep understanding of Turkish, European, and Arab business cultures and preferences"
      },
      benefit3: {
        title: "Weekly Delivery",
        description: "Fresh leads delivered every week directly to your dashboard - no delays"
      }
    },
    form: {
      step1: "Business Information",
      step2: "Target Market",
      step3: "Choose Your Package",
      businessName: "Business Name",
      email: "Email Address",
      businessType: "Business Type",
      country: "Target Country",
      city: "Target City",
      industry: "Target Industry",
      continue: "Continue",
      submit: "Start My Trial"
    },
    pricing: {
      title: "Choose Your Growth Plan",
      starter: {
        name: "Starter",
        price: "€97",
        leads: "200 leads/month",
        features: ["Email & Phone verified", "Weekly delivery", "Basic support"]
      },
      pro: {
        name: "Pro",
        price: "€197",
        leads: "500 leads/month",
        features: ["Everything in Starter", "Priority support", "Advanced filters", "Export tools"]
      },
      premium: {
        name: "Premium",
        price: "€297",
        leads: "1000+ leads/month",
        features: ["Everything in Pro", "Custom lead requirements", "Dedicated account manager", "API access"]
      }
    },
    testimonials: {
      title: "Trusted by 500+ Businesses",
      testimonial1: {
        text: "NexaLeads helped us increase our sales by 300% in just 3 months. The lead quality is exceptional!",
        author: "Ahmed Hassan",
        company: "Digital Marketing Agency, Dubai"
      },
      testimonial2: {
        text: "Finally, leads that actually pick up the phone. Our conversion rate went from 2% to 15%.",
        author: "Maria Schmidt",
        company: "SaaS Company, Berlin"
      },
      testimonial3: {
        text: "The Turkish market leads are incredibly accurate. Best investment for our business expansion.",
        author: "Mehmet Yılmaz",
        company: "E-commerce, Istanbul"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "How do you verify the leads?",
      a1: "We use a combination of manual verification and automated tools to ensure every lead has accurate contact information.",
      q2: "What if I'm not satisfied?",
      a2: "We offer a 30-day money-back guarantee. If you're not happy with the lead quality, we'll refund your payment.",
      q3: "Can I target specific industries?",
      a3: "Yes! You can specify the exact industries, business sizes, and geographic locations you want to target.",
      q4: "How quickly do I receive leads?",
      a4: "New leads are delivered weekly to your dashboard. You'll receive your first batch within 48 hours of signup."
    }
  },
  tr: {
    hero: {
      headline: "Haftalık 200+ Doğrulanmış Yerel İşletme Müşteri Adayı",
      subtext: "Soğuk aramaya zaman kaybetmeyi bırakın. Türkiye, Avrupa ve Arap pazarlarında gerçekten dönüşüm sağlayan kalifiye müşteri adayları alın.",
      cta: "Ücretsiz Denemeyi Başlat"
    },
    benefits: {
      title: "Neden NexaLeads?",
      benefit1: {
        title: "Doğrulanmış Kaliteli Müşteri Adayları",
        description: "Her müşteri adayı iletişim bilgileriyle manuel olarak doğrulanır, %95 doğruluk oranı sağlar"
      },
      benefit2: {
        title: "Yerel Pazar Uzmanlığı",
        description: "Türk, Avrupa ve Arap iş kültürleri ve tercihlerinin derinlemesine anlaşılması"
      },
      benefit3: {
        title: "Haftalık Teslimat",
        description: "Her hafta doğrudan kontrol panelinize teslim edilen taze müşteri adayları - gecikme yok"
      }
    },
    form: {
      step1: "İş Bilgileri",
      step2: "Hedef Pazar",
      step3: "Paketinizi Seçin",
      businessName: "İşletme Adı",
      email: "E-posta Adresi",
      businessType: "İş Türü",
      country: "Hedef Ülke",
      city: "Hedef Şehir",
      industry: "Hedef Sektör",
      continue: "Devam Et",
      submit: "Denemeyi Başlat"
    },
    pricing: {
      title: "Büyüme Planınızı Seçin",
      starter: {
        name: "Başlangıç",
        price: "€97",
        leads: "Ayda 200 müşteri adayı",
        features: ["E-posta ve telefon doğrulanmış", "Haftalık teslimat", "Temel destek"]
      },
      pro: {
        name: "Pro",
        price: "€197",
        leads: "Ayda 500 müşteri adayı",
        features: ["Başlangıç'taki her şey", "Öncelikli destek", "Gelişmiş filtreler", "Dışa aktarma araçları"]
      },
      premium: {
        name: "Premium",
        price: "€297",
        leads: "Ayda 1000+ müşteri adayı",
        features: ["Pro'daki her şey", "Özel müşteri adayı gereksinimleri", "Özel hesap yöneticisi", "API erişimi"]
      }
    },
    testimonials: {
      title: "500+ İşletme Tarafından Güveniliyor",
      testimonial1: {
        text: "NexaLeads sadece 3 ayda satışlarımızı %300 artırmamıza yardımcı oldu. Müşteri adayı kalitesi istisnai!",
        author: "Mehmet Yılmaz",
        company: "E-ticaret, İstanbul"
      },
      testimonial2: {
        text: "Sonunda gerçekten telefonu açan müşteri adayları. Dönüşüm oranımız %2'den %15'e çıktı.",
        author: "Ayşe Demir",
        company: "SaaS Şirketi, Ankara"
      },
      testimonial3: {
        text: "Türk pazarı müşteri adayları inanılmaz derecede doğru. İş genişlemesi için en iyi yatırım.",
        author: "Can Özkan",
        company: "Dijital Pazarlama Ajansı, İzmir"
      }
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      q1: "Müşteri adaylarını nasıl doğruluyorsunuz?",
      a1: "Her müşteri adayının doğru iletişim bilgilerine sahip olduğundan emin olmak için manuel doğrulama ve otomatik araçların bir kombinasyonunu kullanıyoruz.",
      q2: "Memnun kalmazsam ne olur?",
      a2: "30 günlük para iade garantisi sunuyoruz. Müşteri adayı kalitesinden memnun değilseniz, ödemenizi iade ederiz.",
      q3: "Belirli sektörleri hedefleyebilir miyim?",
      a3: "Evet! Hedeflemek istediğiniz tam sektörleri, işletme boyutlarını ve coğrafi konumları belirtebilirsiniz.",
      q4: "Müşteri adaylarını ne kadar hızlı alırım?",
      a4: "Yeni müşteri adayları haftalık olarak kontrol panelinize teslim edilir. Kayıt olduktan sonra ilk grubunuzu 48 saat içinde alacaksınız."
    }
  },
  ar: {
    hero: {
      headline: "احصل على أكثر من 200 عميل محتمل محلي أسبوعياً",
      subtext: "توقف عن إضاعة الوقت في المكالمات الباردة. احصل على عملاء محتملين مؤهلين يحققون التحويل فعلاً في الأسواق التركية والأوروبية والعربية.",
      cta: "ابدأ التجربة المجانية"
    },
    benefits: {
      title: "لماذا تختار نيكسا ليدز؟",
      benefit1: {
        title: "عملاء محتملون عالي الجودة ومتحققون",
        description: "كل عميل محتمل يتم التحقق منه يدوياً مع تفاصيل الاتصال، مما يضمن معدل دقة 95%"
      },
      benefit2: {
        title: "خبرة في الأسواق المحلية",
        description: "فهم عميق للثقافات والتفضيلات التجارية التركية والأوروبية والعربية"
      },
      benefit3: {
        title: "التسليم الأسبوعي",
        description: "عملاء محتملون جدد يتم تسليمهم كل أسبوع مباشرة إلى لوحة التحكم - بدون تأخير"
      }
    },
    form: {
      step1: "معلومات العمل",
      step2: "السوق المستهدف",
      step3: "اختر باقتك",
      businessName: "اسم العمل",
      email: "عنوان البريد الإلكتروني",
      businessType: "نوع العمل",
      country: "البلد المستهدف",
      city: "المدينة المستهدفة",
      industry: "الصناعة المستهدفة",
      continue: "متابعة",
      submit: "ابدأ التجربة"
    },
    pricing: {
      title: "اختر خطة نموك",
      starter: {
        name: "المبتدئ",
        price: "€97",
        leads: "200 عميل محتمل/شهر",
        features: ["البريد الإلكتروني والهاتف متحققان", "التسليم الأسبوعي", "الدعم الأساسي"]
      },
      pro: {
        name: "المحترف",
        price: "€197",
        leads: "500 عميل محتمل/شهر",
        features: ["كل ما في المبتدئ", "الدعم ذو الأولوية", "الفلاتر المتقدمة", "أدوات التصدير"]
      },
      premium: {
        name: "المتميز",
        price: "€297",
        leads: "أكثر من 1000 عميل محتمل/شهر",
        features: ["كل ما في المحترف", "متطلبات عملاء مخصصة", "مدير حساب مخصص", "وصول API"]
      }
    },
    testimonials: {
      title: "موثوق من قبل أكثر من 500 شركة",
      testimonial1: {
        text: "ساعدتنا نيكسا ليدز في زيادة مبيعاتنا بنسبة 300% في 3 أشهر فقط. جودة العملاء المحتملين استثنائية!",
        author: "أحمد حسن",
        company: "وكالة التسويق الرقمي، دبي"
      },
      testimonial2: {
        text: "أخيراً، عملاء محتملين يردون على الهاتف فعلاً. معدل التحويل لدينا ارتفع من 2% إلى 15%.",
        author: "فاطمة العلي",
        company: "شركة SaaS، الرياض"
      },
      testimonial3: {
        text: "العملاء المحتملين في السوق التركي دقيقون بشكل لا يصدق. أفضل استثمار لتوسيع أعمالنا.",
        author: "محمد النور",
        company: "التجارة الإلكترونية، القاهرة"
      }
    },
    faq: {
      title: "الأسئلة الشائعة",
      q1: "كيف تتحققون من العملاء المحتملين?",
      a1: "نستخدم مزيجاً من التحقق اليدوي والأدوات الآلية لضمان أن كل عميل محتمل لديه معلومات اتصال دقيقة.",
      q2: "ماذا لو لم أكن راضياً?",
      a2: "نقدم ضمان استرداد الأموال لمدة 30 يوماً. إذا لم تكن راضياً عن جودة العملاء المحتملين، سنرد دفعتك.",
      q3: "هل يمكنني استهداف صناعات محددة?",
      a3: "نعم! يمكنك تحديد الصناعات الدقيقة وأحجام الأعمال والمواقع الجغرافية التي تريد استهدافها.",
      q4: "كم بسرعة أتلقى العملاء المحتملين؟",
      a4: "يتم تسليم العملاء المحتملين الجدد أسبوعياً إلى لوحة التحكم الخاصة بك. ستتلقى مجموعتك الأولى في غضون 48 ساعة من التسجيل."
    }
  }
};

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'tr' | 'ar'>('en');
  const [formStep, setFormStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    businessType: '',
    country: '',
    city: '',
    industry: '',
    package: ''
  });
  const { toast } = useToast();

  const t = translations[language];
  const isRTL = language === 'ar';

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you within 24 hours to set up your account.",
      });
      console.log('Form submitted:', formData);
    }
  };

  const LanguageSwitcher = () => (
    <div className="flex gap-2">
      {(['en', 'tr', 'ar'] as const).map((lang) => (
        <Button
          key={lang}
          variant={language === lang ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage(lang)}
          className="min-w-[50px]"
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexaLeads
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
            <Clock className="w-4 h-4 mr-2" />
            Limited Time Offer: {formatTime(timeLeft)}
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            {t.hero.headline}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtext}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
              {t.hero.cta}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm">500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm">95% Lead Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            {t.benefits.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, ...t.benefits.benefit1 },
              { icon: Globe, ...t.benefits.benefit2 },
              { icon: Clock, ...t.benefits.benefit3 }
            ].map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-step Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-gray-800">Get Started Today</CardTitle>
              <div className="flex justify-center mt-4">
                <div className="flex gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step <= formStep
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(formStep / 3) * 100}%` }}
                ></div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {formStep === 1 && (
                  <>
                    <h3 className="text-lg font-semibold mb-4">{t.form.step1}</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="businessName">{t.form.businessName}</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.form.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">{t.form.businessType}</Label>
                        <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="agency">Marketing Agency</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {formStep === 2 && (
                  <>
                    <h3 className="text-lg font-semibold mb-4">{t.form.step2}</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="country">{t.form.country}</Label>
                        <Select onValueChange={(value) => setFormData({...formData, country: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select target country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="turkey">Turkey</SelectItem>
                            <SelectItem value="germany">Germany</SelectItem>
                            <SelectItem value="uae">UAE</SelectItem>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="saudi">Saudi Arabia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="city">{t.form.city}</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="Enter target city"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="industry">{t.form.industry}</Label>
                        <Select onValueChange={(value) => setFormData({...formData, industry: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select target industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurants">Restaurants</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="fitness">Fitness</SelectItem>
                            <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {formStep === 3 && (
                  <>
                    <h3 className="text-lg font-semibold mb-4">{t.form.step3}</h3>
                    <div className="space-y-4">
                      {(['starter', 'pro', 'premium'] as const).map((pkg) => (
                        <Card
                          key={pkg}
                          className={`cursor-pointer border-2 transition-all duration-300 ${
                            formData.package === pkg
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData({...formData, package: pkg})}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold">{t.pricing[pkg].name}</h4>
                                <p className="text-sm text-gray-600">{t.pricing[pkg].leads}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-bold">{t.pricing[pkg].price}</span>
                                <span className="text-gray-600">/month</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg"
                  disabled={
                    (formStep === 1 && (!formData.businessName || !formData.email || !formData.businessType)) ||
                    (formStep === 2 && (!formData.country || !formData.industry)) ||
                    (formStep === 3 && !formData.package)
                  }
                >
                  {formStep < 3 ? t.form.continue : t.form.submit}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            {t.pricing.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(['starter', 'pro', 'premium'] as const).map((plan, index) => (
              <Card
                key={plan}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {t.pricing[plan].name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t.pricing[plan].price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <CardDescription className="text-lg font-medium text-blue-600 mt-2">
                    {t.pricing[plan].leads}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {t.pricing[plan].features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                  
                  <Button
                    className={`w-full mt-6 py-6 ${
                      index === 1
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            {t.testimonials.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[t.testimonials.testimonial1, t.testimonials.testimonial2, t.testimonials.testimonial3].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            {t.faq.title}
          </h2>
          
          <div className="space-y-6">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 }
            ].map((faq, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NexaLeads</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering businesses with high-quality leads across Turkey, Europe, and Arab markets.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+90 212 555 0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@nexaleads.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-gray-400">
                <div>Lead Generation</div>
                <div>Market Research</div>
                <div>Business Intelligence</div>
                <div>Custom Solutions</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Live Chat</div>
                <div>Documentation</div>
                <div>API Reference</div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div>© 2024 NexaLeads. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
