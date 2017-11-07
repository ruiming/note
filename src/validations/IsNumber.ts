import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import 'reflect-metadata'

export function IsNumber(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsNumber',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: {}, args: ValidationArguments): boolean {
          const type = Reflect.getMetadata('design:type', args.object, args.property)
          if (type === Number && typeof value === 'string') {
            value = parseInt(value, 10)
          }
          return typeof value === 'number' && !isNaN(value)
        },
        defaultMessage(): string {
          return 'Must be a number or string that can be parsed into number'
        }
      }
    })
  }
}
