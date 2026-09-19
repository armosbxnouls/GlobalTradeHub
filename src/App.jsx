import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Wheat, Flame, FlaskConical, Cpu, Shirt, HardHat, UtensilsCrossed,
  Zap, Truck, Cog, Globe, Search, ShieldCheck, MessageCircle, Video,
  Phone, X, Check, CheckCheck, User, Lock, Star, MapPin, Building2, ChevronDown,
  Send, Mic, MicOff, VideoOff, PhoneOff, Paperclip, Play, Plus, Trash2, ArrowLeft
} from "lucide-react";

const LANGS = {
  ru: "Русский",
  en: "English",
  es: "Español",
  fr: "Français",
  zh: "中文",
  hy: "Հայերեն",
};

const T = {
  ru: {
    appName: "GlobalTradeHub",
    tagline: "Место, где производители со всего мира находят друг друга",
    searchPlaceholder: "Найти компанию или продукцию...",
    allCategories: "Все отрасли",
    register: "Регистрация компании",
    login: "Войти",
    logout: "Выйти",
    viewProfile: "Открыть профиль",
    message: "Написать",
    call: "Аудио",
    videoCall: "Видео",
    security: "Безопасность",
    securityText: "Шифрование сообщений, двухфакторная аутентификация и проверка компаний перед публикацией.",
    companiesFound: "компаний найдено",
    country: "Страна",
    rating: "Рейтинг",
    products: "Продукция",
    close: "Закрыть",
    regTitle: "Регистрация компании",
    companyName: "Название компании",
    regCountry: "Страна",
    regCategory: "Отрасль",
    regEmail: "Email",
    regProducts: "Что вы предлагаете",
    submit: "Зарегистрировать",
    cancel: "Отмена",
    registeredOk: "Компания зарегистрирована и добавлена в каталог",
    chatWith: "Чат с",
    typeMessage: "Введите сообщение...",
    send: "Отправить",
    videoDemoTitle: "Демонстрация видеосвязи",
    videoDemoNote: "Локальный предпросмотр камеры. Реальный звонок между двумя пользователями требует сервера сигнализации.",
    startCamera: "Включить камеру",
    stopCamera: "Завершить",
    cameraDenied: "Доступ к камере не разрешён браузером",
    myCompany: "Моя компания",
    fillAllFields: "Заполните все поля",
    byEmail: "По Email",
    byPhone: "По телефону",
    phoneNumber: "Номер телефона",
    sendCode: "Отправить код",
    codeSentTo: "Код отправлен на",
    enterCode: "Введите код из СМС",
    verify: "Подтвердить",
    codeVerified: "Номер подтверждён",
    invalidCode: "Неверный код",
    resendCode: "Отправить код повторно",
    demoCodeNote: "Демо-режим: реальная СМС не отправляется, код показан во всплывающем уведомлении",
    sendError: "Не удалось отправить код. Проверьте номер и повторите попытку",
    passwordPlaceholder: "Пароль (минимум 6 символов)",
    passwordTooShort: "Пароль должен быть не короче 6 символов",
    confirmEmailNote: "Проверьте почту и подтвердите email, чтобы завершить регистрацию",
    autoReply: "Спасибо за сообщение! Наш менеджер ответит вам в ближайшее время.",
    profileTitle: "Профиль компании",
    tabInfo: "Инфо",
    tabMedia: "Фото и видео",
    address: "Адрес",
    phones: "Телефоны",
    addPhone: "Добавить номер",
    phonePlaceholder: "Номер телефона",
    addressPlaceholder: "Адрес компании",
    addPhoto: "Добавить фото",
    addVideo: "Добавить видео",
    noAddress: "Адрес не указан",
    noPhones: "Телефоны не указаны",
    noMedia: "Пока нет фото и видео",
    save: "Сохранить",
    online: "в сети",
    typing: "печатает...",
    today: "Сегодня",
    editProfile: "Редактировать профиль",
    removePhone: "Удалить",
  },
  en: {
    appName: "GlobalTradeHub",
    tagline: "Where manufacturers from every country find each other",
    searchPlaceholder: "Search company or product...",
    allCategories: "All industries",
    register: "Register company",
    login: "Log in",
    logout: "Log out",
    viewProfile: "View profile",
    message: "Message",
    call: "Audio",
    videoCall: "Video",
    security: "Security",
    securityText: "Encrypted messaging, two-factor authentication, and company verification before listing.",
    companiesFound: "companies found",
    country: "Country",
    rating: "Rating",
    products: "Products",
    close: "Close",
    regTitle: "Register a company",
    companyName: "Company name",
    regCountry: "Country",
    regCategory: "Industry",
    regEmail: "Email",
    regProducts: "What you offer",
    submit: "Register",
    cancel: "Cancel",
    registeredOk: "Company registered and added to the catalog",
    chatWith: "Chat with",
    typeMessage: "Type a message...",
    send: "Send",
    videoDemoTitle: "Video call demo",
    videoDemoNote: "Local camera preview. A real call between two users needs a signaling server.",
    startCamera: "Start camera",
    stopCamera: "End",
    cameraDenied: "Camera access was not granted by the browser",
    myCompany: "My company",
    fillAllFields: "Fill in all fields",
    byEmail: "By email",
    byPhone: "By phone",
    phoneNumber: "Phone number",
    sendCode: "Send code",
    codeSentTo: "Code sent to",
    enterCode: "Enter the SMS code",
    verify: "Verify",
    codeVerified: "Number verified",
    invalidCode: "Invalid code",
    resendCode: "Resend code",
    demoCodeNote: "Demo mode: no real SMS is sent, the code is shown in a notification",
    sendError: "Couldn't send the code. Check the number and try again",
    passwordPlaceholder: "Password (min. 6 characters)",
    passwordTooShort: "Password must be at least 6 characters",
    confirmEmailNote: "Check your email and confirm it to finish registration",
    autoReply: "Thanks for your message! Our manager will reply shortly.",
    profileTitle: "Company profile",
    tabInfo: "Info",
    tabMedia: "Photos & videos",
    address: "Address",
    phones: "Phone numbers",
    addPhone: "Add number",
    phonePlaceholder: "Phone number",
    addressPlaceholder: "Company address",
    addPhoto: "Add photo",
    addVideo: "Add video",
    noAddress: "No address provided",
    noPhones: "No phone numbers provided",
    noMedia: "No photos or videos yet",
    save: "Save",
    online: "online",
    typing: "typing...",
    today: "Today",
    editProfile: "Edit profile",
    removePhone: "Remove",
  },
  es: {
    appName: "GlobalTradeHub",
    tagline: "Donde los fabricantes de todo el mundo se encuentran",
    searchPlaceholder: "Buscar empresa o producto...",
    allCategories: "Todos los sectores",
    register: "Registrar empresa",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    viewProfile: "Ver perfil",
    message: "Mensaje",
    call: "Audio",
    videoCall: "Video",
    security: "Seguridad",
    securityText: "Mensajería cifrada, autenticación de dos factores y verificación de empresas.",
    companiesFound: "empresas encontradas",
    country: "País",
    rating: "Valoración",
    products: "Productos",
    close: "Cerrar",
    regTitle: "Registrar empresa",
    companyName: "Nombre de la empresa",
    regCountry: "País",
    regCategory: "Sector",
    regEmail: "Correo",
    regProducts: "Qué ofrece",
    submit: "Registrar",
    cancel: "Cancelar",
    registeredOk: "Empresa registrada y añadida al catálogo",
    chatWith: "Chat con",
    typeMessage: "Escribe un mensaje...",
    send: "Enviar",
    videoDemoTitle: "Demo de videollamada",
    videoDemoNote: "Vista previa local de la cámara. Una llamada real necesita un servidor de señalización.",
    startCamera: "Encender cámara",
    stopCamera: "Terminar",
    cameraDenied: "El navegador no concedió acceso a la cámara",
    myCompany: "Mi empresa",
    fillAllFields: "Completa todos los campos",
    byEmail: "Por correo",
    byPhone: "Por teléfono",
    phoneNumber: "Número de teléfono",
    sendCode: "Enviar código",
    codeSentTo: "Código enviado a",
    enterCode: "Introduce el código SMS",
    verify: "Verificar",
    codeVerified: "Número verificado",
    invalidCode: "Código incorrecto",
    resendCode: "Reenviar código",
    demoCodeNote: "Modo demo: no se envía un SMS real, el código se muestra en una notificación",
    sendError: "No se pudo enviar el código. Comprueba el número e inténtalo de nuevo",
    passwordPlaceholder: "Contraseña (mín. 6 caracteres)",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    confirmEmailNote: "Revisa tu correo y confírmalo para completar el registro",
    autoReply: "¡Gracias por tu mensaje! Nuestro gestor responderá pronto.",
    profileTitle: "Perfil de la empresa",
    tabInfo: "Información",
    tabMedia: "Fotos y videos",
    address: "Dirección",
    phones: "Teléfonos",
    addPhone: "Añadir número",
    phonePlaceholder: "Número de teléfono",
    addressPlaceholder: "Dirección de la empresa",
    addPhoto: "Añadir foto",
    addVideo: "Añadir video",
    noAddress: "Sin dirección",
    noPhones: "Sin números de teléfono",
    noMedia: "Aún no hay fotos ni videos",
    save: "Guardar",
    online: "en línea",
    typing: "escribiendo...",
    today: "Hoy",
    editProfile: "Editar perfil",
    removePhone: "Quitar",
  },
  fr: {
    appName: "GlobalTradeHub",
    tagline: "Là où les fabricants du monde entier se rencontrent",
    searchPlaceholder: "Rechercher une entreprise ou un produit...",
    allCategories: "Tous les secteurs",
    register: "Inscrire une entreprise",
    login: "Connexion",
    logout: "Déconnexion",
    viewProfile: "Voir le profil",
    message: "Message",
    call: "Audio",
    videoCall: "Vidéo",
    security: "Sécurité",
    securityText: "Messagerie chiffrée, authentification à deux facteurs et vérification des entreprises.",
    companiesFound: "entreprises trouvées",
    country: "Pays",
    rating: "Note",
    products: "Produits",
    close: "Fermer",
    regTitle: "Inscrire une entreprise",
    companyName: "Nom de l'entreprise",
    regCountry: "Pays",
    regCategory: "Secteur",
    regEmail: "E-mail",
    regProducts: "Ce que vous proposez",
    submit: "Inscrire",
    cancel: "Annuler",
    registeredOk: "Entreprise inscrite et ajoutée au catalogue",
    chatWith: "Discuter avec",
    typeMessage: "Écrivez un message...",
    send: "Envoyer",
    videoDemoTitle: "Démo d'appel vidéo",
    videoDemoNote: "Aperçu local de la caméra. Un vrai appel nécessite un serveur de signalisation.",
    startCamera: "Activer la caméra",
    stopCamera: "Terminer",
    cameraDenied: "Le navigateur n'a pas autorisé l'accès à la caméra",
    myCompany: "Mon entreprise",
    fillAllFields: "Remplissez tous les champs",
    byEmail: "Par e-mail",
    byPhone: "Par téléphone",
    phoneNumber: "Numéro de téléphone",
    sendCode: "Envoyer le code",
    codeSentTo: "Code envoyé au",
    enterCode: "Entrez le code SMS",
    verify: "Vérifier",
    codeVerified: "Numéro vérifié",
    invalidCode: "Code invalide",
    resendCode: "Renvoyer le code",
    demoCodeNote: "Mode démo : aucun SMS réel n'est envoyé, le code s'affiche dans une notification",
    sendError: "Impossible d'envoyer le code. Vérifiez le numéro et réessayez",
    passwordPlaceholder: "Mot de passe (6 caractères min.)",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    confirmEmailNote: "Vérifiez votre e-mail et confirmez-le pour terminer l'inscription",
    autoReply: "Merci pour votre message ! Notre responsable répondra bientôt.",
    profileTitle: "Profil de l'entreprise",
    tabInfo: "Infos",
    tabMedia: "Photos et vidéos",
    address: "Adresse",
    phones: "Numéros de téléphone",
    addPhone: "Ajouter un numéro",
    phonePlaceholder: "Numéro de téléphone",
    addressPlaceholder: "Adresse de l'entreprise",
    addPhoto: "Ajouter une photo",
    addVideo: "Ajouter une vidéo",
    noAddress: "Aucune adresse renseignée",
    noPhones: "Aucun numéro renseigné",
    noMedia: "Pas encore de photos ni de vidéos",
    save: "Enregistrer",
    online: "en ligne",
    typing: "en train d'écrire...",
    today: "Aujourd'hui",
    editProfile: "Modifier le profil",
    removePhone: "Supprimer",
  },
  zh: {
    appName: "GlobalTradeHub",
    tagline: "全球生产商彼此相遇的地方",
    searchPlaceholder: "搜索公司或产品...",
    allCategories: "所有行业",
    register: "注册企业",
    login: "登录",
    logout: "退出",
    viewProfile: "查看主页",
    message: "留言",
    call: "语音",
    videoCall: "视频",
    security: "安全保障",
    securityText: "消息加密、双重身份验证以及企业上架前的审核。",
    companiesFound: "家企业",
    country: "国家",
    rating: "评分",
    products: "产品",
    close: "关闭",
    regTitle: "注册企业",
    companyName: "企业名称",
    regCountry: "国家",
    regCategory: "行业",
    regEmail: "邮箱",
    regProducts: "您提供的产品",
    submit: "注册",
    cancel: "取消",
    registeredOk: "企业已注册并加入目录",
    chatWith: "与以下企业聊天",
    typeMessage: "输入消息...",
    send: "发送",
    videoDemoTitle: "视频通话演示",
    videoDemoNote: "本地摄像头预览。真实的双方通话需要信令服务器支持。",
    startCamera: "开启摄像头",
    stopCamera: "结束",
    cameraDenied: "浏览器未授予摄像头权限",
    myCompany: "我的企业",
    fillAllFields: "请填写所有字段",
    byEmail: "邮箱注册",
    byPhone: "手机号注册",
    phoneNumber: "手机号码",
    sendCode: "发送验证码",
    codeSentTo: "验证码已发送至",
    enterCode: "输入短信验证码",
    verify: "验证",
    codeVerified: "号码已验证",
    invalidCode: "验证码错误",
    resendCode: "重新发送验证码",
    demoCodeNote: "演示模式：不会发送真实短信，验证码将显示在通知中",
    sendError: "验证码发送失败，请检查号码后重试",
    passwordPlaceholder: "密码（至少6位）",
    passwordTooShort: "密码至少需要6个字符",
    confirmEmailNote: "请查收邮箱并确认邮件以完成注册",
    autoReply: "感谢您的留言！我们的负责人会尽快回复。",
    profileTitle: "企业主页",
    tabInfo: "信息",
    tabMedia: "照片和视频",
    address: "地址",
    phones: "电话号码",
    addPhone: "添加号码",
    phonePlaceholder: "电话号码",
    addressPlaceholder: "企业地址",
    addPhoto: "添加照片",
    addVideo: "添加视频",
    noAddress: "尚未填写地址",
    noPhones: "尚未填写电话号码",
    noMedia: "暂无照片或视频",
    save: "保存",
    online: "在线",
    typing: "正在输入...",
    today: "今天",
    editProfile: "编辑资料",
    removePhone: "删除",
  },
  hy: {
    appName: "GlobalTradeHub",
    tagline: "Այնտեղ, որտեղ ամբողջ աշխարհի արտադրողները գտնում են միմյանց",
    searchPlaceholder: "Փնտրել ընկերություն կամ ապրանք...",
    allCategories: "Բոլոր ոլորտները",
    register: "Գրանցել ընկերություն",
    login: "Մուտք",
    logout: "Ելք",
    viewProfile: "Բացել պրոֆիլը",
    message: "Գրել",
    call: "Ձայնային",
    videoCall: "Տեսազանգ",
    security: "Անվտանգություն",
    securityText: "Հաղորդագրությունների գաղտնագրում, երկգործոն նույնականացում և ընկերությունների ստուգում մինչև հրապարակումը։",
    companiesFound: "ընկերություն է գտնվել",
    country: "Երկիր",
    rating: "Վարկանիշ",
    products: "Ապրանքներ",
    close: "Փակել",
    regTitle: "Ընկերության գրանցում",
    companyName: "Ընկերության անվանումը",
    regCountry: "Երկիր",
    regCategory: "Ոլորտ",
    regEmail: "Էլ. փոստ",
    regProducts: "Ինչ եք առաջարկում",
    submit: "Գրանցել",
    cancel: "Չեղարկել",
    registeredOk: "Ընկերությունը գրանցվեց և ավելացվեց կատալոգում",
    chatWith: "Զրույց՝",
    typeMessage: "Մուտքագրեք հաղորդագրություն...",
    send: "Ուղարկել",
    videoDemoTitle: "Տեսազանգի ցուցադրություն",
    videoDemoNote: "Տեսախցիկի տեղական նախադիտում։ Իրական զանգը երկու օգտատերերի միջև պահանջում է սիգնալային սերվեր։",
    startCamera: "Միացնել տեսախցիկը",
    stopCamera: "Ավարտել",
    cameraDenied: "Բրաուզերը թույլ չտվեց տեսախցիկի հասանելիությունը",
    myCompany: "Իմ ընկերությունը",
    fillAllFields: "Լրացրեք բոլոր դաշտերը",
    byEmail: "Էլ. փոստով",
    byPhone: "Հեռախոսահամարով",
    phoneNumber: "Հեռախոսահամար",
    sendCode: "Ուղարկել կոդը",
    codeSentTo: "Կոդն ուղարկվել է հետևյալ համարին՝",
    enterCode: "Մուտքագրեք ՍՄՍ կոդը",
    verify: "Հաստատել",
    codeVerified: "Համարը հաստատված է",
    invalidCode: "Սխալ կոդ",
    resendCode: "Կրկին ուղարկել կոդը",
    demoCodeNote: "Դեմո ռեժիմ. իրական ՍՄՍ չի ուղարկվում, կոդը ցուցադրվում է ծանուցման մեջ",
    sendError: "Չհաջողվեց ուղարկել կոդը։ Ստուգեք համարը և կրկին փորձեք",
    passwordPlaceholder: "Գաղտնաբառ (նվազագույնը 6 նիշ)",
    passwordTooShort: "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ",
    confirmEmailNote: "Ստուգեք ձեր էլ. փոստը և հաստատեք այն գրանցումն ավարտելու համար",
    autoReply: "Շնորհակալություն հաղորդագրության համար! Մեր մենեջերը շուտով կպատասխանի։",
    profileTitle: "Ընկերության պրոֆիլ",
    tabInfo: "Տեղեկություններ",
    tabMedia: "Լուսանկարներ և տեսանյութեր",
    address: "Հասցե",
    phones: "Հեռախոսահամարներ",
    addPhone: "Ավելացնել համար",
    phonePlaceholder: "Հեռախոսահամար",
    addressPlaceholder: "Ընկերության հասցեն",
    addPhoto: "Ավելացնել լուսանկար",
    addVideo: "Ավելացնել տեսանյութ",
    noAddress: "Հասցեն նշված չէ",
    noPhones: "Հեռախոսահամարներ նշված չեն",
    noMedia: "Դեռ չկան լուսանկարներ կամ տեսանյութեր",
    save: "Պահպանել",
    online: "առցանց",
    typing: "գրում է...",
    today: "Այսօր",
    editProfile: "Խմբագրել պրոֆիլը",
    removePhone: "Հեռացնել",
  },
};

const CATEGORIES = [
  { id: "agri", icon: Wheat, ramp: "#639922" },
  { id: "metal", icon: Flame, ramp: "#993C1D" },
  { id: "chem", icon: FlaskConical, ramp: "#534AB7" },
  { id: "it", icon: Cpu, ramp: "#185FA5" },
  { id: "textile", icon: Shirt, ramp: "#993556" },
  { id: "construction", icon: HardHat, ramp: "#854F0B" },
  { id: "food", icon: UtensilsCrossed, ramp: "#0F6E56" },
  { id: "energy", icon: Zap, ramp: "#BA7517" },
  { id: "logistics", icon: Truck, ramp: "#5F5E5A" },
  { id: "machinery", icon: Cog, ramp: "#712B13" },
];

const CAT_LABELS = {
  ru: { agri: "Сельское хозяйство", metal: "Металлургия", chem: "Химическая промышленность", it: "IT", textile: "Текстиль", construction: "Строительство", food: "Пищевая промышленность", energy: "Энергетика", logistics: "Логистика", machinery: "Машиностроение" },
  en: { agri: "Agriculture", metal: "Metallurgy", chem: "Chemical industry", it: "IT", textile: "Textile", construction: "Construction", food: "Food industry", energy: "Energy", logistics: "Logistics", machinery: "Machinery" },
  es: { agri: "Agricultura", metal: "Metalurgia", chem: "Industria química", it: "TI", textile: "Textil", construction: "Construcción", food: "Industria alimentaria", energy: "Energía", logistics: "Logística", machinery: "Maquinaria" },
  fr: { agri: "Agriculture", metal: "Métallurgie", chem: "Industrie chimique", it: "Informatique", textile: "Textile", construction: "Construction", food: "Agroalimentaire", energy: "Énergie", logistics: "Logistique", machinery: "Machines" },
  zh: { agri: "农业", metal: "冶金", chem: "化学工业", it: "信息技术", textile: "纺织", construction: "建筑", food: "食品工业", energy: "能源", logistics: "物流", machinery: "机械制造" },
  hy: { agri: "Գյուղատնտեսություն", metal: "Մետալուրգիա", chem: "Քիմիական արդյունաբերություն", it: "ՏՏ", textile: "Տեքստիլ", construction: "Շինարարություն", food: "Սննդի արդյունաբերություն", energy: "Էներգետիկա", logistics: "Լոգիստիկա", machinery: "Մեքենաշինություն" },
};

const COMPANIES = [
  { id: 1, cat: "agri", name: "Zolotoe Pole", country: "🇺🇦 Ukraine", rating: 4.7, desc: { ru: "Экспорт пшеницы и подсолнечного масла", en: "Wheat and sunflower oil exports", es: "Exportación de trigo y aceite de girasol", fr: "Exportation de blé et d'huile de tournesol", zh: "小麦和葵花籽油出口" } },
  { id: 2, cat: "agri", name: "Andes Fruit Co", country: "🇨🇱 Chile", rating: 4.5, desc: { ru: "Свежие фрукты и ягоды на экспорт", en: "Fresh fruit and berry exports", es: "Exportación de fruta fresca", fr: "Export de fruits frais", zh: "新鲜水果出口" } },
  { id: 3, cat: "metal", name: "Ural Steel Group", country: "🇰🇿 Kazakhstan", rating: 4.6, desc: { ru: "Прокат стали и алюминиевые сплавы", en: "Steel rolling and aluminium alloys", es: "Laminados de acero y aleaciones de aluminio", fr: "Laminage d'acier et alliages d'aluminium", zh: "钢材轧制与铝合金" } },
  { id: 4, cat: "metal", name: "Nordic Alloys", country: "🇸🇪 Sweden", rating: 4.8, desc: { ru: "Специальные сплавы для машиностроения", en: "Specialty alloys for machinery", es: "Aleaciones especiales para maquinaria", fr: "Alliages spéciaux pour machines", zh: "机械用特种合金" } },
  { id: 5, cat: "chem", name: "Rhine Chemicals", country: "🇩🇪 Germany", rating: 4.9, desc: { ru: "Промышленные полимеры и растворители", en: "Industrial polymers and solvents", es: "Polímeros industriales y disolventes", fr: "Polymères industriels et solvants", zh: "工业聚合物与溶剂" } },
  { id: 6, cat: "chem", name: "Gulf Petrochem", country: "🇦🇪 UAE", rating: 4.4, desc: { ru: "Нефтехимическое сырьё и удобрения", en: "Petrochemical feedstock and fertilizers", es: "Materia prima petroquímica y fertilizantes", fr: "Matières premières pétrochimiques et engrais", zh: "石化原料与化肥" } },
  { id: 7, cat: "it", name: "Bengaluru Softworks", country: "🇮🇳 India", rating: 4.8, desc: { ru: "Разработка ПО и облачные решения", en: "Software development and cloud services", es: "Desarrollo de software y servicios en la nube", fr: "Développement logiciel et services cloud", zh: "软件开发与云服务" } },
  { id: 8, cat: "it", name: "Warsaw DataWorks", country: "🇵🇱 Poland", rating: 4.6, desc: { ru: "Центры обработки данных и кибербезопасность", en: "Data centers and cybersecurity", es: "Centros de datos y ciberseguridad", fr: "Centres de données et cybersécurité", zh: "数据中心与网络安全" } },
  { id: 9, cat: "textile", name: "Dhaka Weaves", country: "🇧🇩 Bangladesh", rating: 4.3, desc: { ru: "Хлопковые ткани и готовая одежда", en: "Cotton fabrics and garments", es: "Tejidos de algodón y prendas", fr: "Tissus de coton et vêtements", zh: "棉布与成衣" } },
  { id: 10, cat: "construction", name: "Anatolia Build", country: "🇹🇷 Turkey", rating: 4.5, desc: { ru: "Строительные материалы и облицовка", en: "Building materials and cladding", es: "Materiales de construcción y revestimientos", fr: "Matériaux de construction et bardage", zh: "建筑材料与外墙板" } },
  { id: 11, cat: "food", name: "Mekong Foods", country: "🇻🇳 Vietnam", rating: 4.7, desc: { ru: "Рис, кофе и морепродукты", en: "Rice, coffee and seafood", es: "Arroz, café y mariscos", fr: "Riz, café et fruits de mer", zh: "大米、咖啡与海鲜" } },
  { id: 12, cat: "energy", name: "Sahara Solar", country: "🇲🇦 Morocco", rating: 4.6, desc: { ru: "Солнечные панели и накопители энергии", en: "Solar panels and energy storage", es: "Paneles solares y almacenamiento de energía", fr: "Panneaux solaires et stockage d'énergie", zh: "太阳能板与储能" } },
  { id: 13, cat: "logistics", name: "Baltic Freight", country: "🇱🇻 Latvia", rating: 4.4, desc: { ru: "Морские и железнодорожные перевозки", en: "Sea and rail freight", es: "Transporte marítimo y ferroviario", fr: "Fret maritime et ferroviaire", zh: "海运与铁路货运" } },
  { id: 14, cat: "machinery", name: "Osaka Precision", country: "🇯🇵 Japan", rating: 4.9, desc: { ru: "Станки с ЧПУ и роботизация", en: "CNC machines and robotics", es: "Máquinas CNC y robótica", fr: "Machines CNC et robotique", zh: "数控机床与机器人" } },
];

const COUNTRIES = ["🇦🇲 Armenia", "🇷🇺 Russia", "🇺🇸 USA", "🇩🇪 Germany", "🇨🇳 China", "🇮🇳 India", "🇧🇷 Brazil", "🇹🇷 Turkey", "🇦🇪 UAE", "🇯🇵 Japan", "🇵🇱 Poland"];

// Set this to your deployed Twilio backend URL (see twilio-backend/server.js) to send real SMS.
// Leave empty to keep the local demo mode (no real SMS, code shown in a notification).
const API_BASE_URL = "https://globaltradehub.onrender.com";

// Supabase connection — powers real, persistent company registration and storage.
const SUPABASE_URL = "https://mruvrxusxrqbpyhyekfv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__Jp2c5yPP1kI2HQmS-AXXg_GcgyhQek";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function VideoDemo({ t, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [error, setError] = useState("");

  const start = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setActive(true);
    } catch (e) {
      setError(t.cameraDenied);
    }
  };

  const stop = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    }
    setActive(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((tr) => (tr.enabled = muted));
    }
    setMuted(!muted);
  };

  const toggleCam = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((tr) => (tr.enabled = camOff));
    }
    setCamOff(!camOff);
  };

  useEffect(() => () => stop(), []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,14,22,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 16 }}>
      <div style={{ background: "#0F1B2D", borderRadius: 16, width: "100%", maxWidth: 420, padding: 20, color: "#EAEEF5" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{t.videoDemoTitle}</h3>
          <button onClick={() => { stop(); onClose(); }} style={{ background: "none", border: "none", color: "#EAEEF5", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>
        <p style={{ fontSize: 12, color: "#9AA7BD", marginTop: 0, marginBottom: 12 }}>{t.videoDemoNote}</p>
        <div style={{ background: "#142943", borderRadius: 12, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 12 }}>
          {active ? (
            <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Video size={40} color="#4A5A78" />
          )}
        </div>
        {error && <p style={{ color: "#F09595", fontSize: 12, marginBottom: 12 }}>{error}</p>}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {!active ? (
            <button onClick={start} style={{ background: "#D9A441", border: "none", color: "#412402", fontWeight: 600, padding: "10px 18px", borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Video size={16} /> {t.startCamera}
            </button>
          ) : (
            <>
              <button onClick={toggleMute} style={{ background: "#1E3352", border: "none", color: "#EAEEF5", padding: 10, borderRadius: "50%", cursor: "pointer" }}>
                {muted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button onClick={toggleCam} style={{ background: "#1E3352", border: "none", color: "#EAEEF5", padding: 10, borderRadius: "50%", cursor: "pointer" }}>
                {camOff ? <VideoOff size={18} /> : <Video size={18} />}
              </button>
              <button onClick={() => { stop(); }} style={{ background: "#E24B4A", border: "none", color: "#fff", padding: 10, borderRadius: "50%", cursor: "pointer" }}>
                <PhoneOff size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatPanel({ t, company, onClose }) {
  const [messages, setMessages] = useState([
    { from: "them", type: "text", text: "👋", time: nowTime() },
  ]);
  const [input, setInput] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const markLastMeAsRead = () => {
    setMessages((m) => {
      const copy = [...m];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].from === "me") { copy[i] = { ...copy[i], status: "read" }; break; }
      }
      return copy;
    });
  };

  const send = () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setMessages((m) => [...m, { from: "me", type: "text", text: msg, time: nowTime(), status: "sent" }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      markLastMeAsRead();
      setIsTyping(false);
      setMessages((m) => [...m, { from: "them", type: "text", text: t.autoReply, time: nowTime() }]);
    }, 1400);
  };

  const attachPhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMessages((m) => [...m, { from: "me", type: "image", url, time: nowTime(), status: "sent" }]);
    e.target.value = "";
    setIsTyping(true);
    setTimeout(() => {
      markLastMeAsRead();
      setIsTyping(false);
      setMessages((m) => [...m, { from: "them", type: "text", text: t.autoReply, time: nowTime() }]);
    }, 1400);
  };

  const initials = company.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(10,14,22,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }} onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ background: "#0e1621", width: "100%", maxWidth: 460, height: "82vh", borderRadius: "16px 16px 0 0", display: "flex", flexDirection: "column", color: "#EAEEF5" }}
        >
          <div style={{ padding: "10px 14px", borderBottom: "1px solid #1E3352", display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#EAEEF5", cursor: "pointer", padding: 4 }}>
              <ArrowLeft size={20} />
            </button>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#D9A441", color: "#412402", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{company.name}</div>
              <div style={{ fontSize: 12, color: isTyping ? "#5DCAA5" : "#7C8AA3" }}>{isTyping ? t.typing : t.online}</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setShowVideo(true)} title={t.videoCall} style={{ background: "none", border: "none", color: "#D9A441", padding: 8, cursor: "pointer" }}>
                <Video size={19} />
              </button>
              <button onClick={() => setShowVideo(true)} title={t.call} style={{ background: "none", border: "none", color: "#D9A441", padding: 8, cursor: "pointer" }}>
                <Phone size={18} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: 6, background: "#0b131d" }}>
            <div style={{ alignSelf: "center", background: "#17232f", color: "#8896A8", fontSize: 12, padding: "4px 12px", borderRadius: 999, marginBottom: 6 }}>
              {t.today}
            </div>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "78%" }}>
                <div style={{
                  background: m.from === "me" ? "#D9A441" : "#1E3352",
                  color: m.from === "me" ? "#412402" : "#EAEEF5",
                  padding: m.type === "image" ? 4 : "7px 10px",
                  borderRadius: 12,
                  fontSize: 14,
                  position: "relative",
                }}>
                  {m.type === "image" ? (
                    <img src={m.url} alt="" style={{ display: "block", maxWidth: "100%", maxHeight: 220, borderRadius: 8 }} />
                  ) : (
                    <span style={{ wordBreak: "break-word" }}>{m.text}</span>
                  )}
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 4, justifyContent: m.from === "me" ? "flex-end" : "flex-start",
                  fontSize: 10.5, color: "#7C8AA3", marginTop: 2, padding: "0 2px",
                }}>
                  <span>{m.time}</span>
                  {m.from === "me" && (m.status === "read" ? <CheckCheck size={12} color="#5DCAA5" /> : <Check size={12} />)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: "flex-start", background: "#1E3352", padding: "9px 12px", borderRadius: 12, fontSize: 13, color: "#9AA7BD" }}>
                {t.typing}
              </div>
            )}
          </div>

          <div style={{ padding: "10px 12px", borderTop: "1px solid #1E3352", display: "flex", gap: 8, alignItems: "center" }}>
            <input type="file" accept="image/*" ref={fileRef} onChange={attachPhoto} style={{ display: "none" }} />
            <button onClick={() => fileRef.current && fileRef.current.click()} style={{ background: "none", border: "none", color: "#7C8AA3", cursor: "pointer", padding: 6 }}>
              <Paperclip size={20} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t.typeMessage}
              style={{ flex: 1, background: "#17232f", border: "none", borderRadius: 999, padding: "10px 14px", color: "#EAEEF5", fontSize: 14, outline: "none" }}
            />
            <button onClick={send} style={{ background: "#D9A441", border: "none", color: "#412402", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              {input.trim() ? <Send size={16} /> : <Mic size={16} />}
            </button>
          </div>
        </div>
      </div>
      {showVideo && <VideoDemo t={t} onClose={() => setShowVideo(false)} />}
    </>
  );
}

function nowTime() {
  const d = new Date();
  return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
}


function AuthModal({ t, lang, onClose, onRegister }) {
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({ name: "", country: COUNTRIES[0], category: CATEGORIES[0].id, email: "", phone: "", password: "", products: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [codeSent, setCodeSent] = useState(false);
  const [sentCode, setSentCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [toast, setToast] = useState("");

  const switchMethod = (m) => {
    setMethod(m);
    setError("");
    setCodeSent(false);
    setPhoneVerified(false);
    setEnteredCode("");
  };

  const sendCode = async () => {
    if (!form.phone.trim()) {
      setError(t.fillAllFields);
      return;
    }
    setError("");

    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/send-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone }),
        });
        if (!res.ok) throw new Error("send failed");
        setCodeSent(true);
        setPhoneVerified(false);
        setToast(`${t.codeSentTo} ${form.phone}`);
        setTimeout(() => setToast(""), 6000);
      } catch (e) {
        setError(t.sendError);
      }
      return;
    }

    // Demo mode: simulate SMS locally, no backend configured.
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setSentCode(code);
    setCodeSent(true);
    setPhoneVerified(false);
    setToast(`${t.codeSentTo} ${form.phone}: ${code}`);
    setTimeout(() => setToast(""), 6000);
  };

  const verifyCode = async () => {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/verify-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone, code: enteredCode }),
        });
        const data = await res.json();
        if (data.verified) {
          setPhoneVerified(true);
          setError("");
        } else {
          setError(t.invalidCode);
        }
      } catch (e) {
        setError(t.sendError);
      }
      return;
    }

    // Demo mode: compare against the locally generated code.
    if (enteredCode.trim() === sentCode) {
      setPhoneVerified(true);
      setError("");
    } else {
      setError(t.invalidCode);
    }
  };

  const submit = async () => {
    if (!form.name.trim() || !form.products.trim()) {
      setError(t.fillAllFields);
      return;
    }
    if (!form.password.trim() || form.password.length < 6) {
      setError(t.passwordTooShort);
      return;
    }
    if (method === "email") {
      if (!form.email.trim()) {
        setError(t.fillAllFields);
        return;
      }
    } else {
      if (!form.phone.trim() || !phoneVerified) {
        setError(t.fillAllFields);
        return;
      }
    }

    setError("");
    setSubmitting(true);

    // Account email: real email for the email method, or a synthetic one tied to
    // the verified phone number for the phone method (Supabase Auth needs an email).
    const accountEmail = method === "email"
      ? form.email.trim()
      : `${form.phone.replace(/[^0-9]/g, "")}@phone.globaltradehub.local`;

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: accountEmail,
        password: form.password,
      });
      if (signUpError) {
        setError(signUpError.message);
        setSubmitting(false);
        return;
      }

      const ownerId = signUpData.user ? signUpData.user.id : signUpData.session?.user?.id;
      if (!ownerId) {
        setError(t.confirmEmailNote);
        setSubmitting(false);
        return;
      }

      const { data: companyRow, error: insertError } = await supabase
        .from("companies")
        .insert({
          owner_id: ownerId,
          name: form.name.trim(),
          country: form.country,
          category: form.category,
          description: form.products.trim(),
          address: "",
          phones: method === "phone" ? [form.phone.trim()] : [],
        })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      onRegister(companyRow);
    } catch (e) {
      setError(t.sendError);
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,14,22,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 420, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: "#0F1B2D" }}>{t.regTitle}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#0F1B2D" }}><X size={20} /></button>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14, background: "#F0EEE4", borderRadius: 10, padding: 4 }}>
          <button
            onClick={() => switchMethod("email")}
            style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: method === "email" ? "#0F1B2D" : "transparent", color: method === "email" ? "#D9A441" : "#5F5E5A" }}
          >
            {t.byEmail}
          </button>
          <button
            onClick={() => switchMethod("phone")}
            style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: method === "phone" ? "#0F1B2D" : "transparent", color: method === "phone" ? "#D9A441" : "#5F5E5A" }}
          >
            {t.byPhone}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input placeholder={t.companyName} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} style={inputStyle}>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{CAT_LABELS[lang][c.id]}</option>)}
          </select>

          {method === "email" ? (
            <input placeholder={t.regEmail} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  placeholder={t.phoneNumber}
                  value={form.phone}
                  disabled={phoneVerified}
                  onChange={(e) => { setForm({ ...form, phone: e.target.value }); setCodeSent(false); setPhoneVerified(false); }}
                  style={{ ...inputStyle, flex: 1, opacity: phoneVerified ? 0.6 : 1 }}
                />
                {!phoneVerified && (
                  <button onClick={sendCode} style={{ padding: "0 12px", borderRadius: 10, border: "1px solid #0F1B2D", background: "#fff", color: "#0F1B2D", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                    {codeSent ? t.resendCode : t.sendCode}
                  </button>
                )}
              </div>
              {phoneVerified && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0F6E56" }}>
                  <Check size={14} /> {t.codeVerified}
                </div>
              )}
              {codeSent && !phoneVerified && (
                <>
                  <div style={{ fontSize: 12, color: "#5F5E5A" }}>{t.demoCodeNote}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      placeholder={t.enterCode}
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button onClick={verifyCode} style={{ padding: "0 14px", borderRadius: 10, border: "none", background: "#0F1B2D", color: "#D9A441", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      {t.verify}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <input type="password" placeholder={t.passwordPlaceholder} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={inputStyle} />

          <textarea placeholder={t.regProducts} value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} />
          {error && <div style={{ color: "#993C1D", fontSize: 13 }}>{error}</div>}
          {toast && <div style={{ background: "#F0EEE4", color: "#0F1B2D", fontSize: 12, padding: "8px 10px", borderRadius: 8 }}>{toast}</div>}
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid #D3D1C7", background: "#fff", cursor: "pointer" }}>{t.cancel}</button>
            <button onClick={submit} disabled={submitting} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: "#0F1B2D", color: "#D9A441", fontWeight: 600, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1 }}>{submitting ? "…" : t.submit}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #D3D1C7", fontSize: 14, color: "#0F1B2D", background: "#F7F6F2" };

function CompanyProfileModal({ t, lang, company, isMine, onClose, onSave, onOpenChat }) {
  const [tab, setTab] = useState("info");
  const [address, setAddress] = useState(company.address || "");
  const [phones, setPhones] = useState(company.phones || []);
  const [newPhone, setNewPhone] = useState("");
  const [photos, setPhotos] = useState(company.photos || []);
  const [videos, setVideos] = useState(company.videos || []);
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  const catInfo = CATEGORIES.find((c) => c.id === company.cat);
  const Icon = catInfo ? catInfo.icon : Building2;

  const addPhone = () => {
    if (!newPhone.trim()) return;
    setPhones((p) => [...p, newPhone.trim()]);
    setNewPhone("");
  };

  const removePhone = (idx) => setPhones((p) => p.filter((_, i) => i !== idx));

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadMedia = async (file, kind) => {
    setUploadError("");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${company.id}/${kind}-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("company-media").upload(path, file);
      if (uploadErr) {
        setUploadError(uploadErr.message);
        setUploading(false);
        return null;
      }
      const { data } = supabase.storage.from("company-media").getPublicUrl(path);
      setUploading(false);
      return data.publicUrl;
    } catch (e) {
      setUploadError(t.sendError);
      setUploading(false);
      return null;
    }
  };

  const addPhoto = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const url = await uploadMedia(file, "photo");
    if (url) setPhotos((p) => [...p, { id: Date.now(), url }]);
  };

  const addVideo = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const url = await uploadMedia(file, "video");
    if (url) setVideos((v) => [...v, { id: Date.now(), url }]);
  };

  const save = () => {
    onSave({ address, phones, photos, videos });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,14,22,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 55, padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 440, maxHeight: "88vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: (catInfo ? catInfo.ramp : "#888") + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={20} color={catInfo ? catInfo.ramp : "#888"} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: "#0F1B2D" }}>{company.name}</div>
                <div style={{ fontSize: 12, color: "#5F5E5A", display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={11} /> {company.country}
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#0F1B2D" }}><X size={20} /></button>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 12, background: "#F0EEE4", borderRadius: 10, padding: 4 }}>
            <button onClick={() => setTab("info")} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: tab === "info" ? "#0F1B2D" : "transparent", color: tab === "info" ? "#D9A441" : "#5F5E5A" }}>
              {t.tabInfo}
            </button>
            <button onClick={() => setTab("media")} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: tab === "media" ? "#0F1B2D" : "transparent", color: tab === "media" ? "#D9A441" : "#5F5E5A" }}>
              {t.tabMedia}
            </button>
          </div>
        </div>

        <div style={{ padding: "0 20px 20px", overflowY: "auto", flex: 1 }}>
          {tab === "info" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 13, color: "#3A3A38", lineHeight: 1.5 }}>{company.desc[lang] || company.desc.en}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#854F0B" }}>
                <Star size={12} fill="#D9A441" color="#D9A441" /> {company.rating || "—"}
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 6, fontWeight: 600 }}>{t.address}</div>
                {isMine ? (
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t.addressPlaceholder} style={{ ...inputStyle, minHeight: 50, resize: "vertical" }} />
                ) : (
                  <div style={{ fontSize: 13, color: address ? "#0F1B2D" : "#9A9990", display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {address || t.noAddress}
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 6, fontWeight: 600 }}>{t.phones}</div>
                {phones.length === 0 && !isMine && <div style={{ fontSize: 13, color: "#9A9990" }}>{t.noPhones}</div>}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {phones.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F7F6F2", borderRadius: 8, padding: "7px 10px" }}>
                      <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Phone size={13} /> {p}</span>
                      {isMine && (
                        <button onClick={() => removePhone(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#993C1D" }}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isMine && (
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder={t.phonePlaceholder} style={{ ...inputStyle, flex: 1 }} />
                    <button onClick={addPhone} style={{ padding: "0 14px", borderRadius: 10, border: "1px solid #0F1B2D", background: "#fff", color: "#0F1B2D", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                      {t.addPhone}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 8, fontWeight: 600 }}>{t.tabMedia}</div>
              {photos.length === 0 && videos.length === 0 && !isMine && (
                <div style={{ fontSize: 13, color: "#9A9990", marginBottom: 10 }}>{t.noMedia}</div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {photos.map((p) => (
                  <img key={p.id} src={p.url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8 }} />
                ))}
                {videos.map((v) => (
                  <div key={v.id} style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: 8, overflow: "hidden", background: "#0F1B2D" }}>
                    <video src={v.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
                      <Play size={20} color="#fff" fill="#fff" />
                    </div>
                  </div>
                ))}
                {isMine && (
                  <>
                    <button disabled={uploading} onClick={() => photoRef.current && photoRef.current.click()} style={{ width: "100%", aspectRatio: "1", borderRadius: 8, border: "1px dashed #D3D1C7", background: "#F7F6F2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: uploading ? "default" : "pointer", opacity: uploading ? 0.6 : 1, color: "#5F5E5A", fontSize: 11 }}>
                      <Plus size={16} /> {uploading ? "…" : t.addPhoto}
                    </button>
                    <button disabled={uploading} onClick={() => videoRef.current && videoRef.current.click()} style={{ width: "100%", aspectRatio: "1", borderRadius: 8, border: "1px dashed #D3D1C7", background: "#F7F6F2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: uploading ? "default" : "pointer", opacity: uploading ? 0.6 : 1, color: "#5F5E5A", fontSize: 11 }}>
                      <Plus size={16} /> {uploading ? "…" : t.addVideo}
                    </button>
                    <input type="file" accept="image/*" ref={photoRef} onChange={addPhoto} style={{ display: "none" }} />
                    <input type="file" accept="video/*" ref={videoRef} onChange={addVideo} style={{ display: "none" }} />
                  </>
                )}
              </div>
              {uploadError && <div style={{ color: "#993C1D", fontSize: 12, marginTop: 8 }}>{uploadError}</div>}
            </div>
          )}
        </div>

        <div style={{ padding: "0 20px 20px", display: "flex", gap: 10 }}>
          <button onClick={() => onOpenChat(company)} style={{ flex: 1, background: "#0F1B2D", color: "#D9A441", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <MessageCircle size={14} /> {t.message}
          </button>
          {isMine && (
            <button onClick={save} style={{ flex: 1, background: "#D9A441", color: "#412402", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {t.save}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export default function GlobalTradeHub() {
  const [lang, setLang] = useState("ru");
  const [langOpen, setLangOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState(COMPANIES);
  const [dbLoading, setDbLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [toast, setToast] = useState("");
  const [chatCompany, setChatCompany] = useState(null);
  const [profileCompany, setProfileCompany] = useState(null);

  const t = T[lang];

  // Track the logged-in Supabase session (persists across reloads automatically).
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setCurrentUserId(data.session?.user?.id || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUserId(session?.user?.id || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Load real, persisted companies from the database and merge them with the
  // built-in demo catalog above.
  const loadCompanies = () => {
    setDbLoading(true);
    supabase
      .from("companies")
      .select("*, company_media(*)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const dbCompanies = data.map((row) => ({
            id: row.id,
            cat: row.category,
            name: row.name,
            country: row.country,
            rating: row.rating || 0,
            desc: { ru: row.description, en: row.description, es: row.description, fr: row.description, zh: row.description, hy: row.description },
            address: row.address || "",
            phones: row.phones || [],
            photos: (row.company_media || []).filter((m) => m.type === "photo").map((m) => ({ id: m.id, url: m.url })),
            videos: (row.company_media || []).filter((m) => m.type === "video").map((m) => ({ id: m.id, url: m.url })),
            owner_id: row.owner_id,
            fromDb: true,
          }));
          setCompanies([...dbCompanies, ...COMPANIES]);
        }
        setDbLoading(false);
      });
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const filtered = companies.filter((c) => {
    const matchCat = !activeCat || c.cat === activeCat;
    const name = c.name.toLowerCase();
    const desc = (c.desc[lang] || c.desc.en || "").toLowerCase();
    const matchQuery = !query || name.includes(query.toLowerCase()) || desc.includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  // Called after AuthModal has already created the account and saved the row
  // to Supabase — here we just refresh the catalog and show a confirmation.
  const handleRegister = (companyRow) => {
    loadCompanies();
    setShowAuth(false);
    setToast(t.registeredOk);
    setTimeout(() => setToast(""), 3500);
  };

  const handleProfileSave = async (id, updates) => {
    // Persist address + phones to the companies table.
    await supabase.from("companies").update({
      address: updates.address,
      phones: updates.phones,
    }).eq("id", id);

    // Any newly added photos/videos that aren't in the database yet get inserted.
    const existingPhotoIds = new Set((profileCompany?.photos || []).filter((p) => typeof p.id !== "number" || String(p.id).length < 13).map((p) => p.id));
    const newMedia = [
      ...updates.photos.filter((p) => !existingPhotoIds.has(p.id)).map((p) => ({ type: "photo", url: p.url })),
      ...updates.videos.filter((v) => !(profileCompany?.videos || []).some((old) => old.id === v.id)).map((v) => ({ type: "video", url: v.url })),
    ];
    if (newMedia.length > 0) {
      await supabase.from("company_media").insert(newMedia.map((m) => ({ company_id: id, type: m.type, url: m.url })));
    }

    setCompanies((cs) => cs.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    setProfileCompany((pc) => (pc && pc.id === id ? { ...pc, ...updates } : pc));
    loadCompanies();
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F5F4EF", minHeight: "100vh", color: "#0F1B2D" }}>
      <header style={{ background: "#0F1B2D", color: "#EAEEF5", padding: "14px 16px", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "0 auto", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Globe size={22} color="#D9A441" />
            <span style={{ fontWeight: 700, fontSize: 17 }}>{t.appName}</span>
          </div>
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{ background: "#142943", border: "1px solid #1E3352", color: "#EAEEF5", borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13 }}>
              {LANGS[lang]} <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "110%", background: "#142943", border: "1px solid #1E3352", borderRadius: 8, overflow: "hidden", minWidth: 130, zIndex: 40 }}>
                {Object.keys(LANGS).map((code) => (
                  <div key={code} onClick={() => { setLang(code); setLangOpen(false); }}
                    style={{ padding: "9px 12px", fontSize: 13, cursor: "pointer", background: code === lang ? "#1E3352" : "transparent" }}>
                    {LANGS[code]}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <section style={{ background: "#142943", color: "#EAEEF5", padding: "28px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ margin: "0 0 16px", fontSize: 16, color: "#B7C2D6", maxWidth: 560 }}>{t.tagline}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Search size={16} color="#7C8AA3" style={{ position: "absolute", left: 12, top: 12 }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 36px", borderRadius: 10, border: "1px solid #2A4266", background: "#0F1B2D", color: "#EAEEF5", fontSize: 14, outline: "none" }}
              />
            </div>
            <button onClick={() => setShowAuth(true)} style={{ background: "#D9A441", border: "none", color: "#412402", fontWeight: 600, padding: "10px 18px", borderRadius: 10, cursor: "pointer", whiteSpace: "nowrap" }}>
              {t.register}
            </button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px 6px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
          <button onClick={() => setActiveCat(null)} style={pillStyle(!activeCat)}>
            <Building2 size={14} /> {t.allCategories}
          </button>
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = activeCat === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCat(c.id)} style={pillStyle(active, c.ramp)}>
                <Icon size={14} /> {CAT_LABELS[lang][c.id]}
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 16px 40px" }}>
        <div style={{ fontSize: 13, color: "#5F5E5A", margin: "6px 0 12px" }}>{filtered.length} {t.companiesFound}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {filtered.map((c) => {
            const catInfo = CATEGORIES.find((k) => k.id === c.cat);
            const Icon = catInfo ? catInfo.icon : Building2;
            return (
              <div key={c.id} onClick={() => setProfileCompany(c)} style={{ background: "#fff", border: "1px solid #E4E1D6", borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 10, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: (catInfo ? catInfo.ramp : "#888") + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={catInfo ? catInfo.ramp : "#888"} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#5F5E5A", display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} /> {c.country}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#3A3A38", lineHeight: 1.4, minHeight: 34 }}>{c.desc[lang] || c.desc.en}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#854F0B" }}>
                  <Star size={12} fill="#D9A441" color="#D9A441" /> {c.rating || "—"}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setChatCompany(c); }} style={{ marginTop: 4, background: "#0F1B2D", color: "#D9A441", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <MessageCircle size={14} /> {t.message}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: "#EFEDE3", padding: "24px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <ShieldCheck size={26} color="#0F6E56" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.security}</div>
            <div style={{ fontSize: 13, color: "#5F5E5A", maxWidth: 560 }}>{t.securityText}</div>
          </div>
        </div>
      </section>

      {toast && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "#0F1B2D", color: "#EAEEF5", padding: "12px 18px", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, zIndex: 70, fontSize: 14 }}>
          <Check size={16} color="#5DCAA5" /> {toast}
        </div>
      )}

      {showAuth && <AuthModal t={t} lang={lang} onClose={() => setShowAuth(false)} onRegister={handleRegister} />}
      {chatCompany && <ChatPanel t={t} company={chatCompany} onClose={() => setChatCompany(null)} />}
      {profileCompany && (
        <CompanyProfileModal
          t={t}
          lang={lang}
          company={profileCompany}
          isMine={!!(currentUserId && profileCompany.owner_id === currentUserId)}
          onClose={() => setProfileCompany(null)}
          onSave={(updates) => handleProfileSave(profileCompany.id, updates)}
          onOpenChat={(c) => { setProfileCompany(null); setChatCompany(c); }}
        />
      )}
    </div>
  );
}

function pillStyle(active, color) {
  return {
    display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
    padding: "7px 12px", borderRadius: 999, fontSize: 13, cursor: "pointer",
    border: active ? `1px solid ${color || "#0F1B2D"}` : "1px solid #D3D1C7",
    background: active ? (color || "#0F1B2D") + "1a" : "#fff",
    color: active ? (color || "#0F1B2D") : "#3A3A38",
    fontWeight: active ? 600 : 400,
  };
}
