#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer* pServer = NULL;
BLECharacteristic* pTempCharacteristic = NULL;
BLECharacteristic* pVoltCharacteristic = NULL;
BLECharacteristic* pAmpCharacteristic = NULL;
BLECharacteristic* pVelCharacteristic = NULL;
bool deviceConnected = false;

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define TEMP_CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define VOLT_CHARACTERISTIC_UUID "c4b4e314-3254-4115-b153-21b068c22299"
#define AMP_CHARACTERISTIC_UUID  "da13253c-1b91-411b-9955-4bf6944e8c14"
#define VEL_CHARACTERISTIC_UUID  "a1e8f4d6-31a4-4363-8a39-583493201a33"

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    }

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

void setup() {
  Serial.begin(115200);

  BLEDevice::init("ESP32-Greice-Projeto");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);

  pTempCharacteristic = pService->createCharacteristic(
                      TEMP_CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pTempCharacteristic->addDescriptor(new BLE2902());

  pVoltCharacteristic = pService->createCharacteristic(
                      VOLT_CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pVoltCharacteristic->addDescriptor(new BLE2902());

  pAmpCharacteristic = pService->createCharacteristic(
                      AMP_CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pAmpCharacteristic->addDescriptor(new BLE2902());

  pVelCharacteristic = pService->createCharacteristic(
                      VEL_CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pVelCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Aguardando cliente se conectar...");
}

void loop() {
  if (deviceConnected) {
    float temp = random(20.0, 30.0);
    float volt = random(11.5, 12.8);
    float amp = random(1.0, 2.5);
    float vel = random(80.0, 100.0);

    char tempString[8];
    char voltString[8];
    char ampString[8];
    char velString[8];

    dtostrf(temp, 1, 2, tempString);
    dtostrf(volt, 1, 2, voltString);
    dtostrf(amp, 1, 2, ampString);
    dtostrf(vel, 1, 2, velString);

    pTempCharacteristic->setValue(tempString);
    pTempCharacteristic->notify();
    Serial.print("Temperatura: ");
    Serial.println(tempString);

    pVoltCharacteristic->setValue(voltString);
    pVoltCharacteristic->notify();
    Serial.print("Tensão: ");
    Serial.println(voltString);

    pAmpCharacteristic->setValue(ampString);
    pAmpCharacteristic->notify();
    Serial.print("Corrente: ");
    Serial.println(ampString);

    pVelCharacteristic->setValue(velString);
    pVelCharacteristic->notify();
    Serial.print("Velocidade: ");
    Serial.println(velString);

    delay(2000);
  }
}