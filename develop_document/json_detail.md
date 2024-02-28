# Json 명세서


- [Json 명세서](#json-명세서)
    - [**1. 전체 구조**](#1-전체-구조)
    - 설정값
      - [**2. CTRL\_SETTING 장치의 제어 설정**](#2-ctrl_setting-장치의-제어-설정)
      - [**3. UNIT\_SETTING 작동기 설정**](#3-unit_setting-작동기-설정)
      - [**4. SENSOR\_SETTING 센서 설정**](#4-sensor_setting-센서-설정)
    - 데이터
      - [**5. SENSOR\_DATA 센서 측정값(단방향)**](#5-sensor_data-센서-측정값단방향)
      - [**6. UNIT\_STATUS 작동기 상태**](#6-unit_status-작동기-상태)

---

<br>

## **1. 전체 구조**

```json
{
  "CTRL_SETTING": [
    {
      "CID": "AABBCC000000",
      "SETTEMP": "000000FFFAAABBCDFDDDFAABBCCD~",
      "TEMPGAP": "[int]",
      "HEATTEMP": "[int]",
      "ICETYPE": "[int]",
      "ALARMTYPE": "[int]",
      "ALRAMTEMPH": "[int]",
      "ALRAMTMEPL": "[int]",
      "TEL": "01012345678",
      "AWSBIT": "[int]"
    }
  ],
  "UNIT_SETTING": [
    {
      "CID": "AABBCC000000",
      "UID": "[int]",
      "UTYPE": "[int]",
      "UCH": "[int]",
      "UOPENCH": "[int]",
      "UCLOSECH": "[int]",
      "UMVTIME": "[int]",
      "USTTIME": "[int]",
      "UOPENTIME": "[int]",
      "UCLOSETIME": "[int]",
      "UOPTYPE": "[int]",
      "UTIMER": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      "CID": "AABBCC000000",
      "UID": "[int]",
      "UTYPE": "[int]",
      "UCH": "[int]",
      "UOPENCH": "[int]",
      "UCLOSECH": "[int]",
      "UMVTIME": "[int]",
      "USTTIME": "[int]",
      "UOPENTIME": "[int]",
      "UCLOSETIME": "[int]",
      "UOPTYPE": "[int]",
      "UTIMER": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
  ],
  "SENSOR_SETTING": [
    {
      "CID": "AABBCC000000",
      "SID": "[int]",
      "SCH": "[int]",
      "SRESERVERD": "[int]",
      "SMULT": "[float]",
      "SOFFSET": "[float]",
      "SEQ": "y=ax+b"
    },
    {
      "CID": "AABBCC000000",
      "SID": "[int]",
      "SCH": "[int]",
      "SRESERVERD": "[int]",
      "SMULT": "[float]",
      "SOFFSET": "[float]",
      "SEQ": "y=ax+b"
    }
  ],
  "SENSOR_DATA": [
    {
      "CID": "AABBCC000000",
      "sid": "[int]",
      "value": "[float]"
    },
    {
      "CID": "AABBCC000000",
      "sid": "[int]",
      "value": "[float]"
    }
  ],
  "UNIT_STATUS": [
    {
      "CID": "AABBCC000000",
      "uid": "[int]",
      "mode": "[int]",
      "status": "[int]"
    },
    {
      "CID": "AABBCC000000",
      "uid": "[int]",
      "mode": "[int]",
      "status": "[int]"
    },
    {
      "CID": "AABBCC000000",
      "uid": "[int]",
      "mode": "[int]",
      "status": "[int]"
    },
    {
      "CID": "AABBCC000000",
      "uid": "[int]",
      "mode": "[int]",
      "status": "[int]"
    }
  ]
}
```
[목차로 돌아가기](#json-명세서)

---

<br><br>

## **2. CTRL_SETTING 장치의 제어 설정**

- `"CID"` 컨트롤러 MAC 주소
- `"SETTEMP"` 96개의 2자리씩 16진수 문자열
- `"TEMPGAP"` 냉동고 및 제상 히터의 온도 편차
- `"HEATTEMP"` 제상 히터의 온도 설정
- `"ICETYPE"` 에어컨 또는 냉동기의 타입 정의 (냉동기 0, 에어컨 1 ~ 3)
- `"ALARMTYPE"` 경보 메시지 ( 고온 경보 0, 저온 경보 1, 네트워크 경보 2)
- `"ALRAMTEMPH"` 고온 경보 한계 설정.
- `"ALRAMTMEPL"` 저온 경보 한계 설정
- `"TEL"` 메시지 전송을 위한 전화번호.
- `"AWSBIT"` AWS사용여부 0-사용 안함, 1-사용
  <br><br>

  **비고**
- 같은 형태의 CTRL_SETTING 여러개 반복 입력됨  

```json
{
  "CTRL_SETTING": [
    {
      "CID": "AABBCC000000",
      "SETTEMP": "000000FFFAAABBCDFDDDFAABBCCD~",
      "TEMPGAP": "[int]",
      "HEATTEMP": "[int]",
      "ICETYPE": "[int]",
      "ALARMTYPE": "[int]",
      "ALRAMTEMPH": "[int]",
      "ALRAMTMEPL": "[int]",
      "TEL": "01012345678",
      "AWSBIT": "[int]"
    }
  ]
}
```  
[목차로 돌아가기](#json-명세서)

---

<br><br>

## **3. UNIT_SETTING 작동기 설정**

- `"CID"`: 컨트롤러 맥주소
- `"UID"`: 작동기 아이디
- `"UTYPE"`: 작동기 온/오프-오픈/클로즈 정의  
  (0-온/오프, 1-오픈/클로즈)
- `"UCH"`: 작동기 온오프 채널
- `"UOPENCH"`: 작동기 오픈 채널
- `"UCLOSECH"`: 작동기 클로즈 채널
- `"UMVTIME"`: 작동기 오픈 동작시간
- `"USTTIME"`: 작동기 클로즈 동작시간
- `"UOPENTIME"`: 작동기 온 동작시간
- `"UCLOSETIME"`: 작동기 오프 동작시간
- `"UOPTYPE"`: 작동시 동작유형 정의 (0-수동, 1-자동(타이머), 2-원격)
- `"UTIMER"`:
    - 작동기 타이머 설정 (1분단위)
    - [형식]1바이트 단위, 16진수 표기법, hexString 360(16진수 문자열 길이 360)
    - [조건]1비트는 0,1로 표현이 가능한데, 0이면 off, 1이면 on이다. 
    - 1일 = 24시간 = 1440분 x2 (x2하는 이유는 1개의 분마다 켜진 상태와 꺼진 상태 2가지가 있기 때문)
    - 1440/8 = 180 이므로 180 x2 하면 360개.  
  
    - 예시 1 : 16진수 2개(00)는 0000 0000 이니, 0000 0001 이면 0분부터 1분까지 on 이라는 의미임
    - 예시 2 : 0000 0010 이면 1분부터 2분까지 on 이라는 의미임
    - 예시 3 : 0011 0010 이면 1분부터 2분 && 4분부터 6분까지 on 이라는 의미임
      <br>

**비고**
- 같은 형태의 UNIT_SETTING 여러개 반복 입력됨

```json
{
  "UNIT_SETTING": [
    {
      "CID": "AABBCC000000",
      "UID": "[int]",
      "UTYPE": "[int]",
      "UCH": "[int]",
      "UOPENCH": "[int]",
      "UCLOSECH": "[int]",
      "UMVTIME": "[int]",
      "USTTIME": "[int]",
      "UOPENTIME": "[int]",
      "UCLOSETIME": "[int]",
      "UOPTYPE": "[int]",
      "UTIMER": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
  ]
}
```
[목차로 돌아가기](#json-명세서)

---

<br><br>

## **4. SENSOR_SETTING 센서 설정**

이 문서는 센서에 대한 설정을 설명합니다.

- `"CID"`: 컨트롤러 맥주소
- `"SID"`: 센서 아이디 (0~7)
- `"SCH"`: 센서 채널 (0~7)
- `"SRESERVERD"`: 센서 예약어 정의
- `"SMULT"`: 센서 보정값 계수(멀티값) A: 0.1234
- `"SOFFSET"`: 센서 보정값 계수(오프셋값) B: 0.1234
- `"SEQ"`:
    - 변환 수식 : y=ax+b
    - 변경 수식 정의 (a=SMULT, b=SOFFSET, x=센서데이터)

**비고**
- 같은 형태의 SENSOR_SETTING 여러 개 반복 입력됨

   <br>

```json
{
  "SENSOR_SETTING": [
    {
      "CID": "AABBCC000000",
      "SID": "[int]",
      "SCH": "[int]",
      "SRESERVERD": "[int]",
      "SMULT": "[float]",
      "SOFFSET": "[float]",
      "SEQ": "y=ax+b"
    }
  ]
}
```
[목차로 돌아가기](#json-명세서)

---

<br><br>

## **5. SENSOR_DATA 센서 측정값(단방향)**

단방향: 컨트롤러 >> 앱

- `"CID"`: 컨트롤러 맥주소
- `"sid"`: 센서 아이디 (0~7)
- `"value"`: 센서값 (부동 소수점 형태, 예: 10.23, 80.03)

**비고**
- 같은 형태의 SENSOR_DATA 여러 개 반복 입력됨

```json
{
  "SENSOR_DATA": [
    {
      "CID": "AABBCC000000",
      "sid": "[int]",
      "value": "[float]"
    }
  ]
}
```

<br>  

[목차로 돌아가기](#json-명세서)

---

<br><br>

## **6. UNIT_STATUS 작동기 상태**

이 문서는 작동기의 상태에 대한 설정을 나타냅니다.

- `"CID"`: 컨트롤러 맥주소
- `"uid"`: 작동기 아이디 (00, 01, 02, 03 등) , 0~4번까지 만 테스트 할 것 
- `"mode"`: 작동기 동작 모드 (0-수동, 1-자동, 2-원격)
- `"status"`: 작동기 상태 (0-off, 1-on, 2-open, 3-stop, 4-close)

**비고**
- 같은 형태의 UNIT_STATUS 여러 개 반복 입력됨
```json
{
  "UNIT_STATUS": [
    {
      "CID": "AABBCC000000",
      "uid": "[int]",
      "mode": "[int]",
      "status": "[int]"
    }
  ]
}
```
[목차로 돌아가기](#json-명세서)

---