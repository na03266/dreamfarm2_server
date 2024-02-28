# Database Design
```mermaid
erDiagram
    USER ||--o{ USER_CONTROLLERS: "has"
   USER_CONTROLLERS ||--o{ CTRL_SETTING: "환경 구성"
   USER_CONTROLLERS ||--o{ UNIT_SETTING: "환경 구성"
   USER_CONTROLLERS ||--o{ SENSOR_SETTING: "환경 구성"
   USER_CONTROLLERS ||--o{ UNIT_STATUS: "모니터링"
   USER_CONTROLLERS ||--o{ SENSOR_DATA: "모니터링"
   SENSOR_SETTING ||--|| SENSOR_DATA: "관련"
   UNIT_SETTING ||--|| UNIT_STATUS: "관련"


    USER {
        string userId "사용자 ID"
        string password "비밀번호"
        string name "이름"
        string email "이메일"
        string phoneNumber "전화번호"
    }
    USER_CONTROLLERS {
        string userId "사용자 ID"
        string CID "컨트롤러 MAC 주소"
    }
    CTRL_SETTING {
        string CID "컨트롤러 MAC 주소"
        string SETTEMP "제어 설정 온도"
        int TEMPGAP "온도 편차"
        int HEATTEMP "제상 히터 온도"
        int ICETYPE "냉동기 타입"
        int ALARMTYPE "경보 유형"
        int ALRAMTEMPH "고온 경보 한계"
        int ALRAMTMEPL "저온 경보 한계"
        string TEL "전화번호"
        int AWSBIT "AWS 사용 여부"
    }
    UNIT_SETTING {
        string CID "컨트롤러 MAC 주소"
        int UID "작동기 ID"
        int UTYPE "작동기 타입"
        int UCH "작동기 채널"
        int UOPENCH "작동기 오픈 채널"
        int UCLOSECH "작동기 클로즈 채널"
        int UMVTIME "작동기 이동 시간"
        int USTTIME "작동기 정지 시간"
        int UOPENTIME "작동기 오픈 시간"
        int UCLOSETIME "작동기 클로즈 시간"
        int UOPTYPE "작동기 동작 유형"
        string UTIMER "작동기 타이머"
    }
    SENSOR_SETTING {
        string CID "컨트롤러 MAC 주소"
        int SID "센서 ID"
        int SCH "센서 채널"
        int SRESERVERD "센서 예약어"
        float SMULT "보정값 계수"
        float SOFFSET "오프셋값"
        string SEQ "변환 수식"
    }
    SENSOR_DATA {
        string CID "컨트롤러 MAC 주소"
        int sid "센서 ID"
        float value "센서값"
    }
    UNIT_STATUS {
        string CID "컨트롤러 MAC 주소"
        int uid "작동기 ID"
        int mode "작동기 모드"
        int status "작동기 상태"
    }
```


### 1. USER

| 컬럼명         | 자료형    | 설명     | 비고 |
|-------------|--------|--------|----|
| userId      | string | 사용자 ID | PK |
| password    | string | 비밀번호   |    |
| name        | string | 이름     |    |
| email       | string | 이메일    |    |
| phoneNumber | string | 전화번호   |    |  
| authority  | string | 권한     |    |  

### 2. USER_CONTROLLERS

| 컬럼명    | 자료형    | 설명          | 비고 |
|--------|--------|-------------|----|
| userId | string | 사용자 ID      | FK |
| CID    | string | 컨트롤러 MAC 주소 | PK |  

### 3. CTRL_SETTING

| 컬럼명        | 자료형    | 설명          | 비고 |
|------------|--------|-------------|----|
| CID        | string | 컨트롤러 MAC 주소 | FK |
| SETTEMP    | string | 제어 설정 온도    |    |
| TEMPGAP    | int    | 온도 편차       |    |
| HEATTEMP   | int    | 제상 히터 온도    |    |
| ICETYPE    | int    | 냉동기 타입      |    |
| ALARMTYPE  | int    | 경보 유형       |    |
| ALRAMTEMPH | int    | 고온 경보 한계    |    |
| ALRAMTMEPL | int    | 저온 경보 한계    |    |
| TEL        | string | 전화번호        |    |
| AWSBIT     | int    | AWS 사용 여부   |    |

### 4. UNIT_SETTING

| 컬럼명        | 자료형    | 설명          | 비고 |
|------------|--------|-------------|----|
| CID        | string | 컨트롤러 MAC 주소 | FK |
| UID        | int    | 작동기 ID      |    |
| UTYPE      | int    | 작동기 타입      |    |
| UCH        | int    | 작동기 채널      |    |
| UOPENCH    | int    | 작동기 오픈 채널   |    |
| UCLOSECH   | int    | 작동기 클로즈 채널  |    |
| UMVTIME    | int    | 작동기 이동 시간   |    |
| USTTIME    | int    | 작동기 정지 시간   |    |
| UOPENTIME  | int    | 작동기 오픈 시간   |    |
| UCLOSETIME | int    | 작동기 클로즈 시간  |    |
| UOPTYPE    | int    | 작동기 동작 유형   |    |
| UTIMER     | string | 작동기 타이머     |    |

### 5. SENSOR_SETTING

| 컬럼명        | 자료형    | 설명          | 비고 |
|------------|--------|-------------|----|
| CID        | string | 컨트롤러 MAC 주소 | FK |
| SID        | int    | 센서 ID       |    |
| SCH        | int    | 센서 채널       |    |
| SRESERVERD | int    | 센서 예약어      |    |
| SMULT      | float  | 보정값 계수      |    |
| SOFFSET    | float  | 오프셋값        |    |
| SEQ        | string | 변환 수식       |    |

### 6. SENSOR_DATA

| 컬럼명   | 자료형    | 설명          | 비고 |
|-------|--------|-------------|----|
| CID   | string | 컨트롤러 MAC 주소 | FK |
| sid   | int    | 센서 ID       |    |
| value | float  | 센서값         |    |

### 7. UNIT_STATUS

| 컬럼명    | 자료형    | 설명          | 비고 |
|--------|--------|-------------|----|
| CID    | string | 컨트롤러 MAC 주소 | FK |
| uid    | int    | 작동기 ID      |    |
| mode   | int    | 작동기 모드      |    |
| status | int    | 작동기 상태      |    |

5. 비고
    - 한 사용자가 여러 컨트롤러를 소유할 수 있으며, 각 컨트롤러가 여러 장치들을 관리하는 구조.
    - 각 컨트롤러는 여러 설정 및 상태 정보를 가짐
    - 이 정보들은 사용자 컨트롤러 테이블을 통해 사용자에게 연결됨.
