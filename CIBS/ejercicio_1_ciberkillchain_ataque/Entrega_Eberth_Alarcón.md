
#  **Ejercicio Cyber Kill Chain – Ataque**

## 🔍 **Descripción**

El presente ejercicio muestra un ataque basado en la metodología Cyber Kill Chain, enfocado en vulnerar un sistema IoT (**WIFI-SISTEM-IOT**) que detecta ataques de desautenticación en redes Wi-Fi a través de dispositivos ESP32.


## 📑 **Índice**

- [**Ejercicio Cyber Kill Chain – Ataque**](#ejercicio-cyber-kill-chain--ataque)
  - [🔍 **Descripción**](#-descripción)
  - [📑 **Índice**](#-índice)
  - [🔧 **Sistema IoT**](#-sistema-iot)
  - [🎯 **Objetivo del Ataque**](#-objetivo-del-ataque)
  - [💥 **Resolución del Ataque: Cyber Kill Chain**](#-resolución-del-ataque-cyber-kill-chain)
    - [1️⃣ **Reconnaissance (Reconocimiento)**](#1️⃣-reconnaissance-reconocimiento)
    - [2️⃣ **Weaponization (Armado del Ataque)**](#2️⃣-weaponization-armado-del-ataque)
      - [Código de Manipulación BLE en Scapy](#código-de-manipulación-ble-en-scapy)
    - [3️⃣ **Delivery (Entrega del Ataque)**](#3️⃣-delivery-entrega-del-ataque)
    - [4️⃣ **Explotación (Explotación de la Vulnerabilidad)**](#4️⃣-explotación-explotación-de-la-vulnerabilidad)
    - [5️⃣ **Command \& Control (C2)**](#5️⃣-command--control-c2)
    - [6️⃣ **Actions on Objectives (Acción sobre el Objetivo)**](#6️⃣-actions-on-objectives-acción-sobre-el-objetivo)
  - [🔀 **Diagrama de Flujos del Ataque**](#-diagrama-de-flujos-del-ataque)
  - [👤 **Autor**](#-autor)


## 🔧 **Sistema IoT**

El sistema **WIFI-SISTEM-IOT** es una solución de seguridad enfocada en la detección de ataques de desautenticación en redes Wi-Fi. A través de dispositivos ESP32, monitorea el tráfico de la red y muestra en tiempo real las alertas de actividad sospechosa en una interfaz gráfica, permitiendo a los administradores reaccionar ante posibles amenazas.


## 🎯 **Objetivo del Ataque**

Para ejecutar mi ataque, seguiré las fases de la Cyber Kill Chain con el fin de evadir la detección del sistema y mantener una persistencia en la ejecución de ataques de desautenticación sin generar alertas que revelen mi actividad. Una vez que los dispositivos legítimos sean expulsados de la red, estableceré un punto de acceso malicioso (Evil Twin) que imitará la identidad del access point original. Esto me permitirá engañar a los dispositivos desconectados para que se unan automáticamente a mi red, donde podré interceptar su tráfico en busca de credenciales de acceso, datos sensibles o incluso manipular sus conexiones. Con este control total sobre la red comprometida, podré desviar información crítica, interrumpir el servicio legítimo e incluso preparar futuras infiltraciones con mayor facilidad.


## 💥 **Resolución del Ataque: Cyber Kill Chain**

### 1️⃣ **Reconnaissance (Reconocimiento)**

**Técnicas utilizadas:**

- *T1598* – Gather Victim Network Information  
  https://attack.mitre.org/techniques/T1598/

- *T1595.002* – Active Scanning: Wireless Traffic Scanning  
  https://attack.mitre.org/techniques/T1595/002/

Inicio la fase de reconocimiento evaluando la seguridad de la red Wi-Fi objetivo y verificando si está protegida por **WIFI-SISTEM-IOT** (sistema diseñado para detectar ataques de desautenticación). Si está activo, analizo su funcionamiento y posibles vulnerabilidades para encontrar una manera de evadir su detección y continuar con mi ataque sin ser descubierto.

**Pasos realizados:**

- Escaneo el tráfico Wi-Fi con herramientas como **Wireshark**.
- Identifico el **BSSID** del punto de acceso (AP) y los dispositivos **ESP32** que monitorean la red.
- Analizo el comportamiento del sistema para evaluar qué tan efectivamente detecta y reporta los ataques.

**Ejemplo de Detección de Paquetes con Wireshark**

[![wireshark.png](https://i.postimg.cc/L8TL9L6c/wireshark.png)](https://postimg.cc/755fXCz9)

---

### 2️⃣ **Weaponization (Armado del Ataque)**

**Técnicas utilizadas:**

- *CWE-311* – Lack of Encryption in Data Transmission  
  https://cwe.mitre.org/data/definitions/311.html

- *CWE-1188* – Insecure Handling of BLE Communications  
  https://cwe.mitre.org/data/definitions/1188.html

Descubro que las comunición de los ESP32 se transmiten en **texto plano** o sin autenticación fuerte, lo que me permite fabricar paquetes BLE falsos para enviar datos manipulados.

Decido desarrollar un **script en Python con Scapy** para generar respuestas BLE falsas y modificar los reportes enviados al sistema de detección, asegurando que las alertas reales sean suprimidas o alteradas.

#### Código de Manipulación BLE en Scapy

```python
from scapy.all import *
from scapy.layers.bluetooth import *

# Crear un paquete BLE falso para manipular la detección del ESP32
ble_fake_alert = BTLE() / BTLE_ADV(RxAdd=0, TxAdd=0) / BTLE_DATA()

# Configuro datos manipulados
ble_fake_alert[BTLE_DATA].payload = Raw(load=b'\x01\x02\x03\x04\x05')

# Envío el paquete falso a la red BLE
sendp(ble_fake_alert, iface="hci0")
```

Con la opción de **Scapy** me permite manipular paquetes en capa 2 y generar tráfico BLE sin depender de firmware modificado, lo que facilita la evasión del sistema de detección.

---

### 3️⃣ **Delivery (Entrega del Ataque)**

**Técnicas utilizadas:**

- *T1602* – Data Manipulation  
  https://cwe.mitre.org/data/definitions/1188.html

- *T1565.002* – Data Manipulation: Network Traffic Manipulation  
  https://attack.mitre.org/techniques/T1565/002/

Para ejecutar mi ataque:

- Utilizo un **adaptador Bluetooth BLE** en mi equipo para interceptar y modificar paquetes BLE en tiempo real.
- **Falsifico respuestas** del ESP32, enviando datos normales en lugar de alertas de desautenticación, engañando así al sistema de detección.
- Inyecto **ruido falso** para generar alertas irrelevantes y reducir la efectividad del monitoreo.

**Ejemplo de Antenas para Ataques Inalámbricos**

<p >
  <a href="https://postimg.cc/5H6zT7Fh">
    <img src="https://i.postimg.cc/XvggZtNY/AWUS036-ACU.png" alt="AWUS036-ACU" width="200">
  </a>
</p>


---

### 4️⃣ **Explotación (Explotación de la Vulnerabilidad)**

**Técnicas utilizadas:**

- *CWE-345* – Insufficient Verification of Data Authenticity  
  https://cwe.mitre.org/data/definitions/345.html

- *T1071.001* – Application Layer Protocol: Web Protocols  
  https://attack.mitre.org/techniques/T1071/001/

Explotando la vulnerabilidad de falta de verificación en los paquetes manipulados, logro que el sistema de detección los acepte como válidos. Esto me permite:

1. **Ocultar alertas reales**, evitando que los administradores detecten ataques de desautenticación.
2. **Generar ruido falso**, saturando la base de datos con eventos irrelevantes y disminuyendo la capacidad de respuesta del sistema de monitoreo.

---

### 5️⃣ **Command & Control (C2)**

**Técnicas utilizadas:**

- *T1572* – Protocol Tunneling  
  https://attack.mitre.org/techniques/T1572/

- *T1008* – Fallback Channels  
  https://attack.mitre.org/techniques/T1008/

Automatizo mi ataque con un script en Python que me permite:

- **Monitorear** los paquetes de la red en tiempo real.
- **Responder automáticamente** con datos manipulados para suprimir las alertas.
- **Usar un servidor remoto (C2)** para modificar parámetros del ataque y responder a posibles contramedidas implementadas por los administradores.

[![cc2.png](https://i.postimg.cc/prGJLjZV/cc2.png)](https://postimg.cc/9w97xrKs)

---

### 6️⃣ **Actions on Objectives (Acción sobre el Objetivo)**

**Técnicas utilizadas:**

- *T1498.001* – Network Denial of Service: Direct Network Flood  
  https://attack.mitre.org/techniques/T1498/001/

- *T1610* – Deploy Container  
  https://attack.mitre.org/techniques/T1610/

Con la detección de ataques desactivada, puedo:

1. **Lanzar el ataque de desautenticación** sin ser detectado, expulsando a los dispositivos legítimos de la red.
2. **Automatizar ataques periódicos**, provocando interrupciones recurrentes en la conectividad.
3. **Crear un punto de acceso malicioso (Evil Twin)** idéntico al AP original para atraer dispositivos y capturar su tráfico sin que lo noten.
4. **Crear una instancia Docker maliciosa** en un servidor comprometido para capturar credenciales de autenticación Wi-Fi y facilitar futuros ataques.

**Ejecuto el ataque final con aireplay-ng**

```bash
aireplay-ng --deauth 100 -a XX:XX:XX:XX:XX:XX -c YY:YY:YY:YY:YY:YY wlan0mon
```

**Parámetros:**

- `--deauth 100`: Envía 100 paquetes de desautenticación para forzar la desconexión.
- `-a XX:XX:XX:XX:XX:XX`: Dirección MAC del punto de acceso objetivo.
- `-c YY:YY:YY:YY:YY:YY`: Dirección MAC de un cliente conectado al AP.
- `wlan0mon`: Nombre de la interfaz en modo monitor.

**Ejemplo de ataque con aireplay-ng**

[![attacket.jpg](https://i.postimg.cc/7Yr7rwyJ/attacket.jpg)](https://postimg.cc/s1K1pFx3)

---

## 🔀 **Diagrama de Flujos del Ataque**

```
1. [Objetivo] → [Escaneo Wi-Fi]
         ⬇
2. [Reconocimiento - Wireshark]
         ⬇
3. [Weaponization - BLE Fake Alerts]
         ⬇
4. [Delivery - Intercepción de tráfico]
         ⬇
5. [Explotación - Ocultar alertas]
         ⬇
6. [C2 - Automatización del ataque]
         ⬇
7. [Acción - Evil Twin + Desautenticación]
```

---

## 👤 **Autor**

**Ing. Eberth Alarcón**  
LinkedIn: [https://www.linkedin.com/in/eberthalarcon90](https://www.linkedin.com/in/eberthalarcon90)  
🏛️ Universidad de Buenos Aires (UBA)  
📚 Facultad de Ingeniería  
📡 Especialización en Internet de las Cosas (IoT)

