# Ch5. NestJS Architecture: Organizing Code with Modules

## 다른 Module에 Service 내보내기

### 다른 Module에서 사용할 Service를 생성

#### power.service.ts

```
@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log(`Supplying ${watts} worth of power.`);
  }
}
```

### 해당 Module 파일에서 사용할 Service를 내보냄.

#### power.module.ts

```
@Module({
  providers: [PowerService],
  exports: [PowerService]
})
export class PowerModule {}
```

### Service를 사용할 다른 Module에서 사용할 Service의 Module을 가져옴

#### cpu.module.ts

```
@Module({
  imports: [PowerModule],
  providers: [CpuService],
})
export class CpuModule {}
```

### 다른 Module의 Service를 의존성으로 불러와서 사용

#### cpu.service.ts

```
@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}
}
```
