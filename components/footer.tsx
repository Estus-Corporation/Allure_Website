import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const footerColumns: FooterColumnProps[] = [
  {
    title: "Soluções",
    links: [
      { label: "Residenciais", href: "#servicos" },
      { label: "Empresariais", href: "#servicos" },
      { label: "Rurais", href: "#servicos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Diferenciais", href: "#por-que-allure" },
      { label: "Simular economia", href: "#economia" },
      { label: "Fale conosco", href: "#contato" },
    ],
  },
];

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/profile.php?id=61590478804825", label: "Facebook", external: false },
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/allureenergiasolar/", label: "Instagram", external: true },
  { icon: <WhatsAppIcon className="w-5 h-5" />, href: "#contato", label: "WhatsApp", external: false },
];

const MAPS_URL = "https://www.google.com/maps/place/RIOS+Coworking+-+Escrit%C3%B3rio+compartilhado+em+S%C3%A3o+Carlos:+Salas,+Reuni%C3%B5es,+Esta%C3%A7%C3%B5es+de+trabalho,+Caf%C3%A9+e+%C3%81reas+externas/@-22.0167585,-47.8982467,3a,75y,351.47h,106.73t/data=!3m7!1e1!3m5!1sMnRtoCQszNSjih9ioDpBeg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-16.733757409411197%26panoid%3DMnRtoCQszNSjih9ioDpBeg%26yaw%3D351.46523761416927!7i16384!8i8192!4m15!1m8!3m7!1s0x94b877376a560b1b:0x49aed8af0bdfdbb4!2sAv.+Comendador+Alfredo+Maffei,+1387+-+Centro,+S%C3%A3o+Carlos+-+SP,+13561-270!3b1!8m2!3d-22.0166308!4d-47.8984626!16s%2Fg%2F11thx89gxz!3m5!1s0x94b87737d51c8a77:0xc9e668354b54d9b7!8m2!3d-22.0166228!4d-47.8982434!16s%2Fg%2F11j6wg_hp5?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D";

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      {/* Brilho decorativo + linha de brilho no topo */}
      <div className="pointer-events-none absolute -top-28 left-1/3 h-72 w-72 rounded-full bg-brand/20 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-brand" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#inicio" className="inline-flex items-center mb-5 -mt-4 sm:-mt-5">
              <Image
                src="/images/logo-allure.png"
                alt="Allure Engenharia Solar"
                width={150}
                height={48}
                className="brightness-0 invert h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 max-w-sm text-sm leading-relaxed mb-5">
              Engenharia que transforma luz em patrimônio. Projeto e instalação de sistemas fotovoltaicos completos em São Carlos e região.
            </p>
            {/* Redes sociais */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand hover:text-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          {footerColumns.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}

          {/* Contato */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contato</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#contato"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  (16) 99765-0595
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contato@allureenergiasolar.com.br"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  contato@allureenergiasolar.com.br
                </Link>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  Localização
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Allure Engenharia Solar. Todos os direitos reservados.
          </p>
          <p className="text-white/40 text-xs sm:text-sm">
            Feito por{" "}
            <a
              href="https://www.estuscorporation.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Estus Corporation
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
