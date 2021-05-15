import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { meta } from 'eslint/lib/rules/*';

export class JogadoresValidationParamPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        // console.log(`value ${value}, metadata ${metadata.type}`);
        if (!value) {
            throw new BadRequestException(`Valor do parâmetro ${metadata.data} deve ser informado!`);
        }

        return value;
    }

}