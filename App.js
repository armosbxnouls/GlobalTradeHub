import React, { useState, useRef } from "react";
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView,
  FlatList, Modal, StyleSheet, KeyboardAvoidingView, Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

const LANGS = { ru: "Русский", en: "English", es: "Español", fr: "Français", zh: "中文", hy: "Հայերեն" };

const T = {
  ru: {
    appName: "GlobalTradeHub", tagline: "Производители со всего мира — в одном месте",
    searchPlaceholder: "Найти компанию...", allCategories: "Все отрасли",
    register: "Регистрация компании", message: "Написать", security: "Безопасность",
    securityText: "Шифрование сообщений, 2FA и проверка компаний перед публикацией.",
    companiesFound: "компаний найдено", close: "Закрыть", regTitle: "Регистрация компании",
    companyName: "Название компании", regCountry: "Страна", regCategory: "Отрасль",
    regEmail: "Email", regProducts: "Что вы предлагаете", submit: "Зарегистрировать",
    cancel: "Отмена", registeredOk: "Компания зарегистрирована", chatWith: "Чат с",
    typeMessage: "Сообщение...", videoDemoTitle: "Видеозвонок (демо)",
    videoDemoNote: "Локальный предпросмотр камеры. Реальный звонок требует сервера сигнализации.",
    startCamera: "Включить камеру", stopCamera: "Завершить", cameraDenied: "Нет доступа к камере",
    fillAllFields: "Заполните все поля", byEmail: "Email", byPhone: "Телефон",
    phoneNumber: "Номер телефона", sendCode: "Отправить код", codeSentTo: "Код отправлен на",
    enterCode: "Код из СМС", verify: "Подтвердить", codeVerified: "Номер подтверждён",
    invalidCode: "Неверный код", resendCode: "Отправить снова",
    demoCodeNote: "Демо: код показан ниже, реальная СМС не отправляется",
    autoReply: "Спасибо за сообщение! Ответим в ближайшее время.",
  },
  en: {
    appName: "GlobalTradeHub", tagline: "Manufacturers from every country, in one place",
    searchPlaceholder: "Search company...", allCategories: "All industries",
    register: "Register company", message: "Message", security: "Security",
    securityText: "Encrypted messaging, 2FA, and company verification before listing.",
    companiesFound: "companies found", close: "Close", regTitle: "Register a company",
    companyName: "Company name", regCountry: "Country", regCategory: "Industry",
    regEmail: "Email", regProducts: "What you offer", submit: "Register",
    cancel: "Cancel", registeredOk: "Company registered", chatWith: "Chat with",
    typeMessage: "Message...", videoDemoTitle: "Video call (demo)",
    videoDemoNote: "Local camera preview. A real call needs a signaling server.",
    startCamera: "Start camera", stopCamera: "End", cameraDenied: "No camera access",
    fillAllFields: "Fill in all fields", byEmail: "Email", byPhone: "Phone",
    phoneNumber: "Phone number", sendCode: "Send code", codeSentTo: "Code sent to",
    enterCode: "SMS code", verify: "Verify", codeVerified: "Number verified",
    invalidCode: "Invalid code", resendCode: "Resend",
    demoCodeNote: "Demo: code shown below, no real SMS is sent",
    autoReply: "Thanks for your message! We'll reply shortly.",
  },
  es: {
    appName: "GlobalTradeHub", tagline: "Fabricantes de todo el mundo, en un solo lugar",
    searchPlaceholder: "Buscar empresa...", allCategories: "Todos los sectores",
    register: "Registrar empresa", message: "Mensaje", security: "Seguridad",
    securityText: "Mensajería cifrada, 2FA y verificación de empresas.",
    companiesFound: "empresas encontradas", close: "Cerrar", regTitle: "Registrar empresa",
    companyName: "Nombre de la empresa", regCountry: "País", regCategory: "Sector",
    regEmail: "Correo", regProducts: "Qué ofrece", submit: "Registrar",
    cancel: "Cancelar", registeredOk: "Empresa registrada", chatWith: "Chat con",
    typeMessage: "Mensaje...", videoDemoTitle: "Videollamada (demo)",
    videoDemoNote: "Vista previa local. Una llamada real necesita un servidor.",
    startCamera: "Encender cámara", stopCamera: "Terminar", cameraDenied: "Sin acceso a la cámara",
    fillAllFields: "Completa todos los campos", byEmail: "Correo", byPhone: "Teléfono",
    phoneNumber: "Número de teléfono", sendCode: "Enviar código", codeSentTo: "Código enviado a",
    enterCode: "Código SMS", verify: "Verificar", codeVerified: "Número verificado",
    invalidCode: "Código incorrecto", resendCode: "Reenviar",
    demoCodeNote: "Demo: código mostrado abajo, no se envía SMS real",
    autoReply: "¡Gracias! Responderemos pronto.",
  },
  fr: {
    appName: "GlobalTradeHub", tagline: "Les fabricants du monde entier, au même endroit",
    searchPlaceholder: "Rechercher une entreprise...", allCategories: "Tous les secteurs",
    register: "Inscrire une entreprise", message: "Message", security: "Sécurité",
    securityText: "Messagerie chiffrée, 2FA et vérification des entreprises.",
    companiesFound: "entreprises trouvées", close: "Fermer", regTitle: "Inscrire une entreprise",
    companyName: "Nom de l'entreprise", regCountry: "Pays", regCategory: "Secteur",
    regEmail: "E-mail", regProducts: "Ce que vous proposez", submit: "Inscrire",
    cancel: "Annuler", registeredOk: "Entreprise inscrite", chatWith: "Discuter avec",
    typeMessage: "Message...", videoDemoTitle: "Appel vidéo (démo)",
    videoDemoNote: "Aperçu local. Un vrai appel nécessite un serveur.",
    startCamera: "Activer la caméra", stopCamera: "Terminer", cameraDenied: "Pas d'accès caméra",
    fillAllFields: "Remplissez tous les champs", byEmail: "E-mail", byPhone: "Téléphone",
    phoneNumber: "Numéro de téléphone", sendCode: "Envoyer le code", codeSentTo: "Code envoyé au",
    enterCode: "Code SMS", verify: "Vérifier", codeVerified: "Numéro vérifié",
    invalidCode: "Code invalide", resendCode: "Renvoyer",
    demoCodeNote: "Démo : code affiché ci-dessous, aucun SMS réel envoyé",
    autoReply: "Merci ! Nous répondrons bientôt.",
  },
  zh: {
    appName: "GlobalTradeHub", tagline: "全球生产商，尽在一处",
    searchPlaceholder: "搜索公司...", allCategories: "所有行业",
    register: "注册企业", message: "留言", security: "安全保障",
    securityText: "消息加密、双重验证以及企业上架前审核。",
    companiesFound: "家企业", close: "关闭", regTitle: "注册企业",
    companyName: "企业名称", regCountry: "国家", regCategory: "行业",
    regEmail: "邮箱", regProducts: "您提供的产品", submit: "注册",
    cancel: "取消", registeredOk: "企业已注册", chatWith: "与以下企业聊天",
    typeMessage: "输入消息...", videoDemoTitle: "视频通话（演示）",
    videoDemoNote: "本地摄像头预览，真实通话需要信令服务器。",
    startCamera: "开启摄像头", stopCamera: "结束", cameraDenied: "无摄像头权限",
    fillAllFields: "请填写所有字段", byEmail: "邮箱", byPhone: "手机号",
    phoneNumber: "手机号码", sendCode: "发送验证码", codeSentTo: "验证码已发送至",
    enterCode: "短信验证码", verify: "验证", codeVerified: "号码已验证",
    invalidCode: "验证码错误", resendCode: "重新发送",
    demoCodeNote: "演示模式：验证码显示如下，不会发送真实短信",
    autoReply: "感谢您的留言！我们会尽快回复。",
  },
  hy: {
    appName: "GlobalTradeHub", tagline: "Ամբողջ աշխարհի արտադրողները մեկ տեղում",
    searchPlaceholder: "Փնտրել ընկերություն...", allCategories: "Բոլոր ոլորտները",
    register: "Գրանցել ընկերություն", message: "Գրել", security: "Անվտանգություն",
    securityText: "Հաղորդագրությունների գաղտնագրում, 2FA և ընկերությունների ստուգում։",
    companiesFound: "ընկերություն է գտնվել", close: "Փակել", regTitle: "Ընկերության գրանցում",
    companyName: "Ընկերության անվանումը", regCountry: "Երկիր", regCategory: "Ոլորտ",
    regEmail: "Էլ. փոստ", regProducts: "Ինչ եք առաջարկում", submit: "Գրանցել",
    cancel: "Չեղարկել", registeredOk: "Ընկերությունը գրանցվեց", chatWith: "Զրույց՝",
    typeMessage: "Հաղորդագրություն...", videoDemoTitle: "Տեսազանգ (դեմո)",
    videoDemoNote: "Տեղական նախադիտում։ Իրական զանգը պահանջում է սերվեր։",
    startCamera: "Միացնել տեսախցիկը", stopCamera: "Ավարտել", cameraDenied: "Չկա հասանելիություն",
    fillAllFields: "Լրացրեք բոլոր դաշտերը", byEmail: "Էլ. փոստ", byPhone: "Հեռախոս",
    phoneNumber: "Հեռախոսահամար", sendCode: "Ուղարկել կոդը", codeSentTo: "Կոդն ուղարկվել է՝",
    enterCode: "ՍՄՍ կոդ", verify: "Հաստատել", codeVerified: "Համարը հաստատված է",
    invalidCode: "Սխալ կոդ", resendCode: "Կրկին ուղարկել",
    demoCodeNote: "Դեմո. կոդը ցուցադրված է ներքևում, իրական ՍՄՍ չի ուղարկվում",
    autoReply: "Շնորհակալություն! Շուտով կպատասխանենք։",
  },
};

const CATEGORIES = [
  { id: "agri", icon: "leaf-outline", color: "#639922" },
  { id: "metal", icon: "flame-outline", color: "#993C1D" },
  { id: "chem", icon: "flask-outline", color: "#534AB7" },
  { id: "it", icon: "hardware-chip-outline", color: "#185FA5" },
  { id: "textile", icon: "shirt-outline", color: "#993556" },
  { id: "construction", icon: "construct-outline", color: "#854F0B" },
  { id: "food", icon: "restaurant-outline", color: "#0F6E56" },
  { id: "energy", icon: "flash-outline", color: "#BA7517" },
  { id: "logistics", icon: "car-outline", color: "#5F5E5A" },
  { id: "machinery", icon: "cog-outline", color: "#712B13" },
];

const CAT_LABELS = {
  ru: { agri: "Сельское хозяйство", metal: "Металлургия", chem: "Химпром", it: "IT", textile: "Текстиль", construction: "Стройка", food: "Пищепром", energy: "Энергетика", logistics: "Логистика", machinery: "Машиностроение" },
  en: { agri: "Agriculture", metal: "Metallurgy", chem: "Chemical", it: "IT", textile: "Textile", construction: "Construction", food: "Food", energy: "Energy", logistics: "Logistics", machinery: "Machinery" },
  es: { agri: "Agricultura", metal: "Metalurgia", chem: "Química", it: "TI", textile: "Textil", construction: "Construcción", food: "Alimentos", energy: "Energía", logistics: "Logística", machinery: "Maquinaria" },
  fr: { agri: "Agriculture", metal: "Métallurgie", chem: "Chimie", it: "Informatique", textile: "Textile", construction: "Construction", food: "Agroalimentaire", energy: "Énergie", logistics: "Logistique", machinery: "Machines" },
  zh: { agri: "农业", metal: "冶金", chem: "化工", it: "IT", textile: "纺织", construction: "建筑", food: "食品", energy: "能源", logistics: "物流", machinery: "机械" },
  hy: { agri: "Գյուղատնտեսություն", metal: "Մետալուրգիա", chem: "Քիմիա", it: "ՏՏ", textile: "Տեքստիլ", construction: "Շինարարություն", food: "Սնունդ", energy: "Էներգետիկա", logistics: "Լոգիստիկա", machinery: "Մեքենաշինություն" },
};

const COUNTRIES = ["🇦🇲 Armenia", "🇷🇺 Russia", "🇺🇸 USA", "🇩🇪 Germany", "🇨🇳 China", "🇮🇳 India", "🇹🇷 Turkey", "🇦🇪 UAE", "🇯🇵 Japan", "🇵🇱 Poland"];

const COMPANIES = [
  { id: 1, cat: "agri", name: "Zolotoe Pole", country: "🇺🇦 Ukraine", rating: 4.7, desc: { ru: "Экспорт пшеницы и подсолнечного масла", en: "Wheat and sunflower oil exports" } },
  { id: 2, cat: "metal", name: "Ural Steel Group", country: "🇰🇿 Kazakhstan", rating: 4.6, desc: { ru: "Прокат стали и алюминиевые сплавы", en: "Steel rolling and aluminium alloys" } },
  { id: 3, cat: "chem", name: "Rhine Chemicals", country: "🇩🇪 Germany", rating: 4.9, desc: { ru: "Промышленные полимеры и растворители", en: "Industrial polymers and solvents" } },
  { id: 4, cat: "it", name: "Bengaluru Softworks", country: "🇮🇳 India", rating: 4.8, desc: { ru: "Разработка ПО и облачные решения", en: "Software development and cloud services" } },
  { id: 5, cat: "textile", name: "Dhaka Weaves", country: "🇧🇩 Bangladesh", rating: 4.3, desc: { ru: "Хлопковые ткани и готовая одежда", en: "Cotton fabrics and garments" } },
  { id: 6, cat: "construction", name: "Anatolia Build", country: "🇹🇷 Turkey", rating: 4.5, desc: { ru: "Строительные материалы", en: "Building materials and cladding" } },
  { id: 7, cat: "food", name: "Mekong Foods", country: "🇻🇳 Vietnam", rating: 4.7, desc: { ru: "Рис, кофе и морепродукты", en: "Rice, coffee and seafood" } },
  { id: 8, cat: "energy", name: "Sahara Solar", country: "🇲🇦 Morocco", rating: 4.6, desc: { ru: "Солнечные панели", en: "Solar panels and energy storage" } },
  { id: 9, cat: "logistics", name: "Baltic Freight", country: "🇱🇻 Latvia", rating: 4.4, desc: { ru: "Морские и ж/д перевозки", en: "Sea and rail freight" } },
  { id: 10, cat: "machinery", name: "Osaka Precision", country: "🇯🇵 Japan", rating: 4.9, desc: { ru: "Станки с ЧПУ и роботизация", en: "CNC machines and robotics" } },
];

// Set to your deployed Twilio backend URL to send real SMS. Empty = local demo mode.
const API_BASE_URL = "";

function VideoDemo({ t, onClose }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [active, setActive] = useState(false);

  const start = async () => {
    if (!permission || !permission.granted) {
      const res = await requestPermission();
      if (!res.granted) return;
    }
    setActive(true);
  };

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.videoCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.modalTitleDark}>{t.videoDemoTitle}</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color="#EAEEF5" /></TouchableOpacity>
          </View>
          <Text style={styles.noteDark}>{t.videoDemoNote}</Text>
          <View style={styles.videoBox}>
            {active ? (
              <CameraView style={{ flex: 1 }} facing="front" />
            ) : (
              <Ionicons name="videocam-outline" size={40} color="#4A5A78" />
            )}
          </View>
          {!active ? (
            <TouchableOpacity style={styles.goldBtn} onPress={start}>
              <Text style={styles.goldBtnText}>{t.startCamera}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dangerBtn} onPress={() => setActive(false)}>
              <Text style={styles.goldBtnText}>{t.stopCamera}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

function ChatModal({ t, company, onClose }) {
  const [messages, setMessages] = useState([{ from: "them", text: "👋" }]);
  const [input, setInput] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "me", text: input.trim() }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { from: "them", text: t.autoReply }]), 900);
  };

  return (
    <Modal visible transparent animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.overlayBottom}>
        <View style={styles.chatCard}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.noteDark}>{t.chatWith}</Text>
              <Text style={styles.modalTitleDark}>{company.name}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => setShowVideo(true)}>
                <Ionicons name="videocam" size={16} color="#D9A441" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color="#EAEEF5" /></TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(_, i) => String(i)}
            style={{ flex: 1, marginVertical: 10 }}
            renderItem={({ item }) => (
              <View style={[styles.bubble, item.from === "me" ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={item.from === "me" ? styles.bubbleTextMe : styles.bubbleTextThem}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.chatInputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder={t.typeMessage}
              placeholderTextColor="#7C8AA3"
              style={styles.chatInput}
              onSubmitEditing={send}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={send}>
              <Ionicons name="send" size={16} color="#412402" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {showVideo && <VideoDemo t={t} onClose={() => setShowVideo(false)} />}
    </Modal>
  );
}

function RegisterModal({ t, lang, onClose, onRegister }) {
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({ name: "", country: COUNTRIES[0], category: CATEGORIES[0].id, email: "", phone: "", products: "" });
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sentCode, setSentCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [verified, setVerified] = useState(false);

  const sendCode = async () => {
    if (!form.phone.trim()) { setError(t.fillAllFields); return; }
    setError("");
    if (API_BASE_URL) {
      try {
        await fetch(`${API_BASE_URL}/api/send-code`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone }),
        });
        setCodeSent(true);
      } catch (e) { setError(t.invalidCode); }
      return;
    }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setSentCode(code);
    setCodeSent(true);
  };

  const verifyCode = async () => {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/verify-code`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone, code: enteredCode }),
        });
        const data = await res.json();
        setVerified(!!data.verified);
        if (!data.verified) setError(t.invalidCode);
      } catch (e) { setError(t.invalidCode); }
      return;
    }
    if (enteredCode.trim() === sentCode) { setVerified(true); setError(""); }
    else setError(t.invalidCode);
  };

  const submit = () => {
    if (!form.name.trim() || !form.products.trim()) { setError(t.fillAllFields); return; }
    if (method === "email" && !form.email.trim()) { setError(t.fillAllFields); return; }
    if (method === "phone" && (!form.phone.trim() || !verified)) { setError(t.fillAllFields); return; }
    onRegister(form);
  };

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.overlay}>
        <ScrollView style={styles.regCard} contentContainerStyle={{ padding: 20 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.modalTitleLight}>{t.regTitle}</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color="#0F1B2D" /></TouchableOpacity>
          </View>

          <View style={styles.tabRow}>
            <TouchableOpacity style={[styles.tab, method === "email" && styles.tabActive]} onPress={() => setMethod("email")}>
              <Text style={method === "email" ? styles.tabTextActive : styles.tabText}>{t.byEmail}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, method === "phone" && styles.tabActive]} onPress={() => setMethod("phone")}>
              <Text style={method === "phone" ? styles.tabTextActive : styles.tabText}>{t.byPhone}</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.input} placeholder={t.companyName} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />

          <Text style={styles.fieldLabel}>{t.regCountry}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            {COUNTRIES.map((c) => (
              <TouchableOpacity key={c} onPress={() => setForm({ ...form, country: c })}
                style={[styles.choicePill, form.country === c && styles.choicePillActive]}>
                <Text style={form.country === c ? styles.choicePillTextActive : styles.choicePillText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.fieldLabel}>{t.regCategory}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            {CATEGORIES.map((c) => (
              <TouchableOpacity key={c.id} onPress={() => setForm({ ...form, category: c.id })}
                style={[styles.choicePill, form.category === c.id && styles.choicePillActive]}>
                <Text style={form.category === c.id ? styles.choicePillTextActive : styles.choicePillText}>{CAT_LABELS[lang][c.id]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {method === "email" ? (
            <TextInput style={styles.input} placeholder={t.regEmail} value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} keyboardType="email-address" autoCapitalize="none" />
          ) : (
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TextInput style={[styles.input, { flex: 1 }]} placeholder={t.phoneNumber} value={form.phone}
                  editable={!verified} keyboardType="phone-pad"
                  onChangeText={(v) => { setForm({ ...form, phone: v }); setCodeSent(false); setVerified(false); }} />
                {!verified && (
                  <TouchableOpacity style={styles.smallBtn} onPress={sendCode}>
                    <Text style={styles.smallBtnText}>{codeSent ? t.resendCode : t.sendCode}</Text>
                  </TouchableOpacity>
                )}
              </View>
              {verified && (
                <View style={styles.rowCenter}>
                  <Ionicons name="checkmark-circle" size={16} color="#0F6E56" />
                  <Text style={{ color: "#0F6E56", marginLeft: 6 }}>{t.codeVerified}</Text>
                </View>
              )}
              {codeSent && !verified && (
                <>
                  <Text style={styles.hint}>{t.demoCodeNote}{sentCode ? `: ${sentCode}` : ""}</Text>
                  <View style={{ flexDirection: "row", gap: 8, marginTop: 6 }}>
                    <TextInput style={[styles.input, { flex: 1 }]} placeholder={t.enterCode} value={enteredCode} onChangeText={setEnteredCode} keyboardType="number-pad" />
                    <TouchableOpacity style={styles.smallBtnDark} onPress={verifyCode}>
                      <Text style={styles.smallBtnDarkText}>{t.verify}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}

          <TextInput style={[styles.input, { height: 80, textAlignVertical: "top" }]} placeholder={t.regProducts} value={form.products} onChangeText={(v) => setForm({ ...form, products: v })} multiline />

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}><Text style={styles.cancelBtnText}>{t.cancel}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={submit}><Text style={styles.goldBtnText}>{t.submit}</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function App() {
  const [lang, setLang] = useState("ru");
  const [langOpen, setLangOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState(COMPANIES);
  const [showReg, setShowReg] = useState(false);
  const [chatCompany, setChatCompany] = useState(null);
  const [toast, setToast] = useState("");

  const t = T[lang];

  const filtered = companies.filter((c) => {
    const matchCat = !activeCat || c.cat === activeCat;
    const desc = (c.desc[lang] || c.desc.en || "").toLowerCase();
    const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || desc.includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleRegister = (form) => {
    setCompanies((c) => [{
      id: Date.now(), cat: form.category, name: form.name, country: form.country,
      rating: 0, desc: { ru: form.products, en: form.products },
    }, ...c]);
    setShowReg(false);
    setToast(t.registeredOk);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.rowCenter}>
          <Ionicons name="globe-outline" size={22} color="#D9A441" />
          <Text style={styles.headerTitle}>{t.appName}</Text>
        </View>
        <TouchableOpacity style={styles.langBtn} onPress={() => setLangOpen(!langOpen)}>
          <Text style={styles.langBtnText}>{LANGS[lang]}</Text>
          <Ionicons name="chevron-down" size={14} color="#EAEEF5" />
        </TouchableOpacity>
      </View>

      {langOpen && (
        <View style={styles.langDropdown}>
          {Object.keys(LANGS).map((code) => (
            <TouchableOpacity key={code} style={styles.langItem} onPress={() => { setLang(code); setLangOpen(false); }}>
              <Text style={styles.langItemText}>{LANGS[code]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.heroSection}>
        <Text style={styles.tagline}>{t.tagline}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchPlaceholder}
          placeholderTextColor="#7C8AA3"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.registerBtn} onPress={() => setShowReg(true)}>
          <Text style={styles.goldBtnText}>{t.register}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        <TouchableOpacity style={[styles.catPill, !activeCat && styles.catPillActive]} onPress={() => setActiveCat(null)}>
          <Text style={!activeCat ? styles.catPillTextActive : styles.catPillText}>{t.allCategories}</Text>
        </TouchableOpacity>
        {CATEGORIES.map((c) => (
          <TouchableOpacity key={c.id} style={[styles.catPill, activeCat === c.id && { backgroundColor: c.color + "22", borderColor: c.color }]} onPress={() => setActiveCat(c.id)}>
            <Ionicons name={c.icon} size={14} color={activeCat === c.id ? c.color : "#3A3A38"} />
            <Text style={[styles.catPillText, activeCat === c.id && { color: c.color, fontWeight: "600" }]}> {CAT_LABELS[lang][c.id]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.countText}>{filtered.length} {t.companiesFound}</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16, paddingTop: 4, paddingBottom: 90 }}
        renderItem={({ item }) => {
          const cat = CATEGORIES.find((c) => c.id === item.cat);
          return (
            <View style={styles.card}>
              <View style={styles.rowCenter}>
                <View style={[styles.catIconBox, { backgroundColor: (cat ? cat.color : "#888") + "22" }]}>
                  <Ionicons name={cat ? cat.icon : "business-outline"} size={18} color={cat ? cat.color : "#888"} />
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSub}>{item.country}</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{item.desc[lang] || item.desc.en}</Text>
              <View style={styles.rowCenter}>
                <Ionicons name="star" size={12} color="#D9A441" />
                <Text style={styles.ratingText}> {item.rating || "—"}</Text>
              </View>
              <TouchableOpacity style={styles.messageBtn} onPress={() => setChatCompany(item)}>
                <Ionicons name="chatbubble-outline" size={14} color="#D9A441" />
                <Text style={styles.messageBtnText}> {t.message}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.securityBox}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#0F6E56" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.securityTitle}>{t.security}</Text>
              <Text style={styles.securityText}>{t.securityText}</Text>
            </View>
          </View>
        }
      />

      {toast ? (
        <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>
      ) : null}

      {showReg && <RegisterModal t={t} lang={lang} onClose={() => setShowReg(false)} onRegister={handleRegister} />}
      {chatCompany && <ChatModal t={t} company={chatCompany} onClose={() => setChatCompany(null)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F4EF" },
  header: { backgroundColor: "#0F1B2D", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  headerTitle: { color: "#EAEEF5", fontWeight: "700", fontSize: 17, marginLeft: 8 },
  langBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#142943", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: "#1E3352" },
  langBtnText: { color: "#EAEEF5", fontSize: 13, marginRight: 4 },
  langDropdown: { position: "absolute", top: 58, right: 14, backgroundColor: "#142943", borderRadius: 8, borderWidth: 1, borderColor: "#1E3352", zIndex: 40, overflow: "hidden" },
  langItem: { paddingVertical: 9, paddingHorizontal: 14 },
  langItemText: { color: "#EAEEF5", fontSize: 13 },
  heroSection: { backgroundColor: "#142943", padding: 16 },
  tagline: { color: "#B7C2D6", fontSize: 15, marginBottom: 12 },
  searchInput: { backgroundColor: "#0F1B2D", borderWidth: 1, borderColor: "#2A4266", borderRadius: 10, color: "#EAEEF5", paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  registerBtn: { backgroundColor: "#D9A441", borderRadius: 10, paddingVertical: 11, alignItems: "center" },
  catRow: { marginTop: 12, maxHeight: 44 },
  catPill: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#D3D1C7", backgroundColor: "#fff", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  catPillActive: { borderColor: "#0F1B2D", backgroundColor: "#0F1B2D22" },
  catPillText: { fontSize: 13, color: "#3A3A38" },
  catPillTextActive: { fontSize: 13, color: "#0F1B2D", fontWeight: "600" },
  countText: { fontSize: 13, color: "#5F5E5A", marginLeft: 16, marginTop: 10 },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E4E1D6", borderRadius: 14, padding: 16, marginBottom: 12 },
  catIconBox: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  cardTitle: { fontWeight: "600", fontSize: 15, color: "#0F1B2D" },
  cardSub: { fontSize: 12, color: "#5F5E5A", marginTop: 2 },
  cardDesc: { fontSize: 13, color: "#3A3A38", marginTop: 10, lineHeight: 18 },
  ratingText: { fontSize: 12, color: "#854F0B", marginTop: 8 },
  messageBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#0F1B2D", borderRadius: 10, paddingVertical: 9, marginTop: 10 },
  messageBtnText: { color: "#D9A441", fontWeight: "600", fontSize: 13 },
  securityBox: { flexDirection: "row", backgroundColor: "#EFEDE3", borderRadius: 14, padding: 16, marginTop: 6 },
  securityTitle: { fontWeight: "600", color: "#0F1B2D", marginBottom: 4 },
  securityText: { fontSize: 13, color: "#5F5E5A", lineHeight: 18 },
  toast: { position: "absolute", bottom: 24, alignSelf: "center", backgroundColor: "#0F1B2D", borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12 },
  toastText: { color: "#EAEEF5", fontSize: 14 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  overlay: { flex: 1, backgroundColor: "rgba(10,14,22,0.55)", justifyContent: "center", padding: 16 },
  overlayBottom: { flex: 1, backgroundColor: "rgba(10,14,22,0.55)", justifyContent: "flex-end" },
  modalTitleDark: { color: "#EAEEF5", fontSize: 16, fontWeight: "600" },
  modalTitleLight: { color: "#0F1B2D", fontSize: 18, fontWeight: "600" },
  noteDark: { color: "#9AA7BD", fontSize: 12 },
  videoCard: { backgroundColor: "#0F1B2D", borderRadius: 16, padding: 20 },
  videoBox: { backgroundColor: "#142943", borderRadius: 12, aspectRatio: 4 / 3, alignItems: "center", justifyContent: "center", overflow: "hidden", marginVertical: 12 },
  goldBtn: { backgroundColor: "#D9A441", borderRadius: 999, paddingVertical: 12, alignItems: "center" },
  dangerBtn: { backgroundColor: "#E24B4A", borderRadius: 999, paddingVertical: 12, alignItems: "center" },
  goldBtnText: { color: "#412402", fontWeight: "700" },
  chatCard: { backgroundColor: "#0F1B2D", height: "78%", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  iconBtn: { backgroundColor: "#1E3352", padding: 8, borderRadius: 20 },
  bubble: { padding: 10, borderRadius: 14, marginBottom: 8, maxWidth: "78%" },
  bubbleMe: { backgroundColor: "#D9A441", alignSelf: "flex-end" },
  bubbleThem: { backgroundColor: "#1E3352", alignSelf: "flex-start" },
  bubbleTextMe: { color: "#412402" },
  bubbleTextThem: { color: "#EAEEF5" },
  chatInputRow: { flexDirection: "row", gap: 8, borderTopWidth: 1, borderTopColor: "#1E3352", paddingTop: 10 },
  chatInput: { flex: 1, backgroundColor: "#142943", borderWidth: 1, borderColor: "#1E3352", borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10, color: "#EAEEF5" },
  sendBtn: { backgroundColor: "#D9A441", width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  regCard: { backgroundColor: "#fff", borderRadius: 16, maxHeight: "90%" },
  tabRow: { flexDirection: "row", backgroundColor: "#F0EEE4", borderRadius: 10, padding: 4, marginBottom: 14 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center" },
  tabActive: { backgroundColor: "#0F1B2D" },
  tabText: { fontSize: 13, color: "#5F5E5A", fontWeight: "600" },
  tabTextActive: { fontSize: 13, color: "#D9A441", fontWeight: "600" },
  fieldLabel: { fontSize: 12, color: "#5F5E5A", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#D3D1C7", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: "#0F1B2D", backgroundColor: "#F7F6F2", marginBottom: 10 },
  choicePill: { borderWidth: 1, borderColor: "#D3D1C7", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginRight: 8, backgroundColor: "#fff" },
  choicePillActive: { borderColor: "#0F1B2D", backgroundColor: "#0F1B2D" },
  choicePillText: { fontSize: 13, color: "#3A3A38" },
  choicePillTextActive: { fontSize: 13, color: "#D9A441", fontWeight: "600" },
  smallBtn: { paddingHorizontal: 12, justifyContent: "center", borderRadius: 10, borderWidth: 1, borderColor: "#0F1B2D" },
  smallBtnText: { fontSize: 12, color: "#0F1B2D", fontWeight: "600" },
  smallBtnDark: { paddingHorizontal: 14, justifyContent: "center", borderRadius: 10, backgroundColor: "#0F1B2D" },
  smallBtnDarkText: { fontSize: 12, color: "#D9A441", fontWeight: "600" },
  hint: { fontSize: 12, color: "#5F5E5A", marginTop: 6 },
  errorText: { color: "#993C1D", fontSize: 13, marginBottom: 6 },
  cancelBtn: { flex: 1, borderWidth: 1, borderColor: "#D3D1C7", borderRadius: 10, paddingVertical: 11, alignItems: "center" },
  cancelBtnText: { color: "#0F1B2D" },
  submitBtn: { flex: 1, backgroundColor: "#0F1B2D", borderRadius: 10, paddingVertical: 11, alignItems: "center" },
});
