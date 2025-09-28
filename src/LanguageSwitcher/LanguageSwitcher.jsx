import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  // Keep current language synced
  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setOpen(false);
  };

  return (
    <div className={`${styles.languageSwitcher} relative inline-block text-left`}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md shadow-md border border-gray-200 hover:bg-white transition"
      >
        <Globe className="w-5 h-5 text-blue-600" />
        <span className="font-medium">{currentLang.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-40 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-blue-100 ${currentLang.code === lang.code
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700"
                    }`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
