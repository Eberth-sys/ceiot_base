

# **Ejercicio Cyber Kill Chain - Defensa**  

## **🛡️Auditoría de Seguridad en WIFI-SISTEM-IOT**  

## **📑 Índice**
- [**Ejercicio Cyber Kill Chain - Defensa**](#ejercicio-cyber-kill-chain---defensa)
  - [**🛡️Auditoría de Seguridad en WIFI-SISTEM-IOT**](#️auditoría-de-seguridad-en-wifi-sistem-iot)
  - [**📑 Índice**](#-índice)
  - [**📌 Descripción**](#-descripción)
  - [**1️⃣ Actions on Objectives (Acción sobre el Objetivo)**](#1️⃣-actions-on-objectives-acción-sobre-el-objetivo)
  - [**2️⃣ Command \& Control (C2)**](#2️⃣-command--control-c2)
  - [**3️⃣ Exploitation (Explotación de la Vulnerabilidad)**](#3️⃣-exploitation-explotación-de-la-vulnerabilidad)
  - [**4️⃣ Delivery (Entrega del Ataque)**](#4️⃣-delivery-entrega-del-ataque)
  - [**5️⃣ Weaponization (Armado del Ataque)**](#5️⃣-weaponization-armado-del-ataque)
  - [📌 **Conclusión**](#-conclusión)
  - [**👨‍💻 Autor**](#-autor)
   

## **📌 Descripción**  
Este ejercicio presenta un análisis defensivo basado en la Cyber Kill Chain Inversa, con el objetivo de detectar y mitigar los ataques previamente analizados. Como auditor de seguridad, debo implementar medidas efectivas en cada fase del ataque, asegurando que el sistema de monitoreo y deteccion de ataques de desautenticacion pueda protegerse de amenazas sin depender de recursos ilimitados.  

Para ello, examinaré las técnicas utilizadas por el atacante en orden inverso, aplicando estrategias que refuercen la seguridad, reduzcan la superficie de ataque y garanticen la integridad del sistema.  



## **1️⃣ Actions on Objectives (Acción sobre el Objetivo)**  

Un ataque **Evil Twin** es una de las tácticas más utilizadas por los atacantes para capturar credenciales o espiar tráfico. Para prevenirlo, implemento un sistema de **monitoreo en tiempo real** que analiza el comportamiento de los dispositivos en la red. Una señal de alerta clave es la **conexión frecuente a diferentes puntos de acceso con el mismo SSID**, lo que puede indicar que los dispositivos están siendo engañados para conectarse a un AP falso.  

Para detectar esta amenaza, utilizo **Wireless Intrusion Detection Systems (WIDS)**, que me permiten identificar la existencia de **múltiples AP con el mismo nombre pero diferentes direcciones MAC**, una clara señal de un ataque en curso.  

Para mitigar el impacto de este tipo de ataques, aplico **WPA3 con SAE (Simultaneous Authentication of Equals)**, lo que impide que los dispositivos se conecten automáticamente a redes falsas sin autenticación mutua. Además, configuro **listas de control de acceso (ACL) para restringir dispositivos autorizados** en el firewall. Finalmente, **desactivo la conexión automática a redes abiertas** en dispositivos críticos, reduciendo el riesgo de que se unan accidentalmente a un AP malicioso.  

**Ataque Evil Twin en acción:**  

 [![Evil-Twin-Attack.png](https://i.postimg.cc/HsZFzwBR/Evil-Twin-Attack.png)](https://postimg.cc/56zPNCcS)

En esta imagen se representa un ataque Evil Twin, donde un atacante crea un punto de acceso falso que imita la red legítima. Los dispositivos cercanos pueden conectarse automáticamente a esta red maliciosa, permitiendo al atacante interceptar tráfico, robar credenciales y realizar ataques MITM (Man-in-the-Middle).


## **2️⃣ Command & Control (C2)**  

Para detectar si un atacante ha logrado establecer un canal de comunicación con un dispositivo comprometido, **analizo el tráfico de red en busca de conexiones inusuales**. Cualquier dispositivo que envíe tráfico periódicamente a un servidor desconocido o que muestre un **aumento repentino en solicitudes anómalas** podría estar siendo controlado remotamente.  

En particular, monitorizo el comportamiento de los **ESP32**, verificando si hay conexiones a direcciones IP no autorizadas o cambios en sus patrones de comunicación. Una **alteración en la frecuencia de paquetes** o conexiones repetidas a dominios externos puede ser una indicación clara de que un atacante ha tomado el control.  

Para mitigar este riesgo, configuro un **firewall con reglas estrictas**, bloqueando automáticamente las conexiones salientes a servidores no identificados. También implemento un **sistema de detección y prevención de intrusos (IDS/IPS) como Suricata o Snort**, que genera alertas en caso de tráfico sospechoso o intento de exfiltración de datos.  

**Ejemplo de tráfico sospechoso detectado en la red:**  

*"Este análisis de tráfico muestra conexiones que podrían estar relacionadas con un servidor C2 malicioso. La identificación de estos patrones permite prevenir la comunicación con servidores de control remoto y bloquear posibles comandos del atacante."*  

[![exploitnetwork.png](https://i.postimg.cc/PJd032Gs/exploitnetwork.png)](https://postimg.cc/JDdTt34P)


## **3️⃣ Exploitation (Explotación de la Vulnerabilidad)**  

El atacante intentará explotar vulnerabilidades en el sistema para modificar paquetes y manipular la información transmitida. Para prevenir esto, **valido la integridad de los paquetes enviados y recibidos** en la red, asegurando que no hayan sido alterados por un tercero.  

Para ello, utilizo **firmas digitales en los reportes generados por el sistema WIFI-SISTEM-IOT**, de manera que cualquier paquete falsificado sea rechazado inmediatamente. Además, aplico **cifrado AES-256 en todas las transmisiones**, lo que impide que un atacante pueda interceptar y modificar los datos sin la clave correcta.  

**Ejemplo de tráfico manipulado detectado en Wireshark:**  

*"En esta captura de Wireshark, se puede observar tráfico que ha sido posiblemente alterado. La inspección de estos paquetes ayuda a detectar intentos de explotación y evitar la manipulación de datos en la red."*  

[![wiresharktrunked.webp](https://i.postimg.cc/8cPB7j2G/wiresharktrunked.webp)](https://postimg.cc/jwmJ9dq3)  



## **4️⃣ Delivery (Entrega del Ataque)**  

Para evitar la entrega de paquetes manipulados por un atacante, **monitoreo los paquetes de autenticación y analizo el tráfico en busca de actividad sospechosa**. Cualquier paquete BLE que no provenga de un dispositivo autenticado es inmediatamente bloqueado.  

Para reforzar la seguridad, aplico **listas blancas de dispositivos autorizados**, permitiendo únicamente conexiones verificadas. También **restringo el tráfico BLE**, asegurándome de que solo los ESP32 legítimos puedan comunicarse con el sistema.  


**Sistema IDS/IPS detectando actividad sospechosa en la red mediante Suricata:**  

![IDS Suricata](https://i.postimg.cc/ZqRRVRmN/4.png)  

**Ejemplo de Lista Blanca para dispositivos ESP32 autorizados.**

        esp32_devices:
        - address: "AA:BB:CC:DD:EE:FF"  
            name: "ESP32_01"

        - address: "11:22:33:44:55:66"
            name: "ESP32_02"

        - address: "22:33:44:55:66:77"
            name: "ESP32_03"

"*Con esta lista blanca configurada, el sistema solo permitirá la comunicación con los ESP32 registrados, rechazando cualquier otro intento de conexión sospechoso. Esto previene ataques de suplantación de identidad y falsificación de dispositivos en la red BLE*".


## **5️⃣ Weaponization (Armado del Ataque)**  

Antes de que un atacante pueda ejecutar su ataque, es posible **identificar herramientas de hacking en la red**. Software como **Aircrack-ng, MDK3 y Scapy** son comúnmente utilizados para la manipulación de paquetes. Al detectar la presencia de estos programas en la red, se pueden establecer medidas de contención antes de que el ataque ocurra.  

Además, monitorizo **el firmware de los ESP32**, asegurándome de que no haya modificaciones sospechosas que puedan indicar una manipulación por parte de un atacante.  

**Ejemplo de manipulación con herramientas de ataque BLE:**

![BLE Attack](https://i.postimg.cc/KcLY9w60/5.png)  



## 📌 **Conclusión**  

Este análisis demuestra que una **defensa bien estructurada y en capas** puede prevenir ataques antes de que comprometan la seguridad del sistema **WIFI-SISTEM-IOT**, con las medidas adecuadas, puede detectar intentos de manipulación, bloquear tráfico malicioso y asegurar que solo dispositivos autorizados puedan comunicarse.  

Implementando estas estrategias, logramos:  
- **Detectar intentos de escaneo y manipulación en tiempo real.**  
- **Prevenir ataques de Evil Twin y exfiltración de datos.**  
- **Proteger la integridad y la disponibilidad de la red.**  


## **👨‍💻 Autor**  
**📌 Ing. Eberth Alarcón**  
🏛️ Universidad de Buenos Aires (UBA)  
📚 Facultad de Ingeniería  
📡 Especialización en Internet de las Cosas (IoT)  
🔗 [LinkedIn](https://www.linkedin.com/in/eberthalarcon90)  
