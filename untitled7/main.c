#include <stdio.h>
struct dados{
    char *cadastro;
};

void escrita(struct dados *a){

    FILE *arquivo = fopen("dados.txt","wb");


    fwrite(a,1,sizeof(struct dados),arquivo);

    fclose(arquivo);
}

void leitura(){

    struct dados texto;

    FILE *arquivo = fopen("dados.txt","r");

    fread(&texto,1,sizeof(texto),arquivo);
    printf("%s",texto.cadastro);
    fclose(arquivo);
}

int main(){
    struct dados x;
    x.cadastro ="Jose da Silva\n 29/05/2000";
    //printf("%s",x.cadastro);
    escrita(&x);
    leitura();

}



