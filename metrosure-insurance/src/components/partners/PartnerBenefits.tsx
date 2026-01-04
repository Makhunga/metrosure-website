"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: "trending_up",
    title: "Proven Sales Growth",
    description: "Our partners see an average 75% sales increase within the first 6 months. We don't just promise results, we deliver them consistently.",
  },
  {
    icon: "analytics",
    title: "Data-Driven Insights",
    description: "Customer profiling and segmentation using data analytics. We provide regular reports so you can make informed decisions and optimise performance.",
  },
  {
    icon: "verified",
    title: "Quality Assurance Team",
    description: "Our dedicated QA team maintains a 95% daily average, ensuring every sale is compliant and every customer interaction meets the highest standards.",
  },
  {
    icon: "account_balance_wallet",
    title: "Zero Overhead Costs",
    description: "We handle staffing, training, compliance, and marketing materials. You provide the space; we bring everything else.",
  },
  {
    icon: "volunteer_activism",
    title: "Youth Employment",
    description: "We recruit and develop young individuals, they are the future. Every partnership creates local jobs and builds skills in your community.",
  },
  {
    icon: "shield",
    title: "Full Compliance Handled",
    description: "We're an FSP-licensed provider (47089). All regulatory requirements, compliance, and auditing are our responsibility, not yours.",
  }
];

export default function PartnerBenefits() {
  return (
    <section className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            Why Partner With Us
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
          >
            Benefits That Impact Your Bottom Line
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            Our partnership model is designed to maximize value for your business
            while making a positive impact on your community.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <motion.div
                className="relative h-full p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-transparent transition-all duration-300 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-transparent transition-all duration-300" />

                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">
                    {benefit.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar - Matching Home Page Style */}
        <motion.div
          className="mt-16 bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          {/* Organic Blob Pattern - Matching Home Page CTA */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1008%26quot%3b)' fill='none'%3e%3cpath d='M29.17 140C29.17 131.06 2.86 142.25 0 128.52C-11.73 72.25 -33.5 30.76 0 0C36.5 -33.5 70 0 140 0C210 0 210 0 280 0C350 0 350 0 420 0C490 0 490 0 560 0C630 0 630 0 700 0C770 0 770 0 840 0C896 0 896.37 -2.89 952 0C966.37 0.75 970.32 -2.97 980 7.27C1036.47 67.03 1039.41 69.41 1084.29 140C1109.41 179.52 1098.54 227.5 1120 227.5C1143.32 227.5 1155 187.21 1173.85 140C1200.41 73.46 1178.66 52.25 1210.81 0C1221.73 -17.75 1235.4 0 1260 0C1330 0 1330 0 1400 0C1456 0 1473.99 -24.44 1512 0C1543.99 20.56 1530.85 44.26 1540 90C1544.85 114.26 1540 115 1540 140C1540 157.5 1543.17 157.89 1540 175C1530.2 227.89 1517.5 226.69 1514.07 280C1509.62 349.19 1512.96 353.06 1524.23 420C1525.92 430.06 1538.87 423.96 1540 434C1546.75 493.96 1573.16 530.16 1540 560C1503.16 593.16 1470 560 1400 560C1330 560 1330 560 1260 560C1199.74 560 1191.3 573.9 1139.49 560C1121.3 555.12 1137.07 533.68 1120 522.44C1057.32 481.18 1031.83 444.07 980 455C942.74 462.85 978.44 532.53 941.82 560C908.44 585.03 890.91 560 840 560C770 560 770 560 700 560C637.78 560 629.08 573.38 575.56 560C559.08 555.88 564.58 525 560 525C555.81 525 572.21 556.46 558.03 560C502.21 573.96 489.01 560 420 560C350 560 350 560 280 560C245 560 234.35 579.31 210 560C164.35 523.79 179.96 499.83 140 448.97C124.96 429.83 120.59 433.62 100 420C50.59 387.31 30.41 398.93 0 356.36C-19.59 328.93 0 318.18 0 280C0 225.22 -10.53 220.98 0 170.43C4.05 150.98 29.17 152.02 29.17 140' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M420 91.72C395.2 96.73 388.89 113.9 388.89 140C388.89 184.71 386.56 227.32 420 233.33C472.12 242.7 490.57 203.24 560 170.77C590.36 156.57 619.57 156.12 619.57 140C619.57 123.45 592.8 113.36 560 105.43C493.01 89.22 480.75 79.45 420 91.72' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M840 131.76C838.16 131.76 835 136.49 835 140C835 142.13 837.86 143.04 840 143.04C841.31 143.04 841.89 141.68 841.89 140C841.89 136.04 841.61 131.76 840 131.76' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M280 242.08C241.09 242.08 204.17 263.81 204.17 280C204.17 295.24 241.61 304.93 280 304.93C330.08 304.93 381.11 295.43 381.11 280C381.11 264 329.56 242.08 280 242.08' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M980 254.83C959.96 254.83 943.28 261.64 943.28 280C943.28 322.92 954.83 377.39 980 377.39C1009.32 377.39 1052.26 317.57 1052.26 280C1052.26 256.29 1014.45 254.83 980 254.83' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1260 252C1235.76 252 1204 268.35 1204 280C1204 290.89 1233.96 297.07 1260 297.07C1271.17 297.07 1278.42 289.65 1278.42 280C1278.42 267.12 1272.97 252 1260 252' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M111.28 0C111.28 19.31 36.16 71.15 0 71.15C-19.48 71.15 -21.7 13.87 0 0C33.94 -21.7 111.28 -16.27 111.28 0' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M192.5 140C162.31 88.93 154.44 40.9 180 0C198.19 -29.1 230 0 280 0C333.85 0 381.42 -28.21 387.69 0C396.98 41.79 353.6 73.25 311.11 140C299.75 157.84 298.75 169.17 280 169.17C239.45 169.17 212.31 173.51 192.5 140' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M560 62.22C500.82 29.61 440 16.48 440 0C440 -14.63 500 0 560 0C630 0 630 0 700 0C746.66 0 791.51 -25.49 793.33 0C796.51 44.51 697.94 83.35 710 140C721.27 192.92 784.43 219.13 840 219.13C874.02 219.13 859.42 175.38 889.19 140C929.42 92.18 937.64 52.73 980 52.73C1017.33 52.73 1048.57 97.59 1048.57 140C1048.57 178.98 1018.39 182.47 980 215.51C937.06 252.47 923.41 239.28 885.9 280C853.41 315.27 878.46 349.01 840 367.5C785.51 393.69 769.98 367.56 700 369.36C629.98 371.16 620.28 397.38 560 374.71C501.49 352.7 462.42 323.86 462.42 280C462.42 241.12 508.56 240.32 560 209.23C624.37 170.32 694.04 176.26 694.04 140C694.04 102.75 627.84 99.61 560 62.22' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1227.69 140C1227.69 103.24 1235.38 94.94 1260 62.22C1288.05 24.94 1291.81 18.32 1333.04 0C1361.81 -12.79 1366.52 0 1400 0C1417.11 0 1434.22 -10.68 1434.22 0C1434.22 24.32 1421.46 37.84 1400 70C1374.74 107.84 1340.77 111.08 1340.77 140C1340.77 160.89 1378.18 146.14 1400 169.62C1443.22 216.14 1452.74 219.46 1470.86 280C1490.21 344.65 1453.61 359.01 1474.93 420C1488.18 457.89 1523.28 441.77 1540 477.75C1555.81 511.77 1565.91 544.78 1540 560C1495.91 585.91 1470 560 1400 560C1330 560 1330 560 1260 560C1221.9 560 1208.64 581.81 1183.8 560C1138.64 520.35 1157.63 492.98 1120 437.07C1110.52 422.98 1089.57 432.27 1089.57 420C1089.57 400.4 1096.22 384.52 1120 373.33C1181.44 344.4 1196.52 368.73 1260 339.76C1298.76 322.07 1324.47 313.79 1324.47 280C1324.47 234.91 1293.33 230.22 1260 182C1244.94 160.22 1227.69 163.13 1227.69 140' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M189.26 420C189.26 378.81 234.02 352.88 280 352.88C328.39 352.88 330.06 385.03 378 420C400.06 436.09 401.4 435.08 420 455C466.77 505.08 508.73 528.09 508.73 560C508.73 580.59 464.37 560 420 560C352.98 560 351.27 563.53 285.96 560C281.27 559.75 282.74 556.39 280 552.43C234.39 486.39 189.26 478.59 189.26 420' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M749.58 560C749.58 529.73 800.4 459.07 840 459.07C873.79 459.07 896.36 526.07 896.36 560C896.36 576.54 868.18 560 840 560C794.79 560 749.58 580.2 749.58 560' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M21.54 0C21.54 3.74 7 13.77 0 13.77C-3.77 13.77 -4.2 2.68 0 0C6.57 -4.2 21.54 -3.15 21.54 0' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M560 19.01C540.42 19.01 523.33 5.03 523.33 0C523.33 -4.47 541.66 0 560 0C602.78 0 645.56 -4.7 645.56 0C645.56 4.81 601.54 19.01 560 19.01' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M936.49 140C936.49 119.87 959.7 98.18 980 98.18C997.89 98.18 1012.86 119.68 1012.86 140C1012.86 158.68 997.7 176.18 980 176.18C959.51 176.18 936.49 158.87 936.49 140' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M515.45 280C515.45 262.25 533.99 251.21 560 247.69C626.26 238.71 631.38 244.44 700 255C736.38 260.6 770 269.84 770 280C770 289.78 735.05 287.67 700 294.89C630.05 309.29 624.32 328.43 560 323.24C532.04 320.98 515.45 300.02 515.45 280' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1370.53 280C1388.54 261.28 1385.58 236.92 1400 236.92C1414.14 236.92 1424.22 255.49 1427.65 280C1437.03 347.03 1398.78 362.28 1425.63 420C1454.95 483.03 1494.32 465.58 1540 521.5C1551.5 535.58 1555.1 555.85 1540 560C1485.1 575.1 1470 560 1400 560C1330 560 1330 560 1260 560C1244.05 560 1234.67 572.55 1228.1 560C1198.01 502.55 1176.47 476.75 1186.67 420C1192.42 387.97 1227.51 407.18 1260 382.44C1319.44 337.18 1318.54 334.04 1370.53 280' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M254.07 420C254.07 408.23 266.86 400.82 280 400.82C293.83 400.82 308 408.06 308 420C308 436.57 293.66 457.84 280 457.84C266.69 457.84 254.07 436.74 254.07 420' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M360.43 560C360.43 546.94 392.61 513.33 420 513.33C442.12 513.33 459.44 545.82 459.44 560C459.44 569.15 439.72 560 420 560C390.22 560 360.43 570.28 360.43 560' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M822.5 560C822.5 554.14 832.33 540.47 840 540.47C846.54 540.47 850.91 553.44 850.91 560C850.91 563.2 845.45 560 840 560C831.25 560 822.5 563.91 822.5 560' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1008'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Decorative Blurs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Ready for 75% Sales Growth?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Join retail partners like TFG who are seeing proven results. Our data-driven
              approach and quality assurance team deliver consistent, reliable growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href="#partner-inquiry"
                className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Start Your Partnership
              </motion.a>
            </motion.div>

            <motion.p
              className="text-sm text-white/70 mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.span
                className="material-symbols-outlined text-sm"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                lock
              </motion.span>
              Secure & Confidential. No spam.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
