import java.util.Scanner;

public class InicioPAM{
    private static Scanner scanner = new Scanner(System.in);
    public static void main(String[] args) throws Exception {
        int opcion;
        do{ // Se inicia el bucle promcipal
            mostrarMENU();
            opcion = scanner.nextInt();
            scanner.nextLine();

            switch (opcion) {
                case 1:// Opcion 1 me mostrara todo lo que se encuentre dentro del case
                    System.out.println("1. Respeto");
                    System.out.println("2. Importante participación activa en orden");
                    System.out.println("3. No entregar trabajos incompletos");
                    System.out.println("4. No se aplican examenes fuera de tiempo");
                    System.out.println("5. Plagio de trabajos = 0 para todos");
                    System.out.println("6. 3 faltas = Final del parcial");
                    System.out.println("7. Calificación Maxima en final 8");
                    break;
                case 2:// Opcion 2 me mostrara todo lo que se encuentre dentro del case   
                    System.out.println("1. Entregar los trabajos para su revisión");
                    System.out.println("2. Entregas en PDF");
                    System.out.println("3. Avisos de clase");
                    System.out.println("4.Entregas autorizadas con retraso, 5 calif Max");
                    break;
                case 3:// Opcion 3 me mostrara todo lo que se encuentre dentro del case
                    System.out.println("1er Parcial: 20-09-25");
                    System.out.println("2do Parcial: 03-10-25");
                    System.out.println("3er Parcial: 01-12-25");
                    break;
                case 4:// Opcion 4 me mostrara todo lo que se encuentre dentro del case
                    System.out.println("EVIDENCIA DE CONOCIMIENTO   1P-40%, 2P-40%, 3P-20%");
                    System.out.println("EVIDENCIA DE DESEMPEÑO      1P-20%, 2P-20%, 3P-10%");
                    System.out.println("EVIDENICA DE PRODUCTO       IP-30%, 2P-20%, 3P-40%");
                    System.out.println("PROYECTO INTEGRADOR         1P-10%, 2P-20%, 3P-30%");
                    break; 
                case 5:// Finaliza el programa
                    System.out.println("Adios");
                    break;     
                default:// En caso de que no ingreses un numero que corresponda al menu
                    System.out.println("Vuelve a intentarlo esta opcion no es valida");
                    break;
                    }
                        if (opcion >=1 && opcion <=4){// valida los numero que se aceptam
                        System.out.println("Dale enter para salir");
                        scanner.nextLine();
                        }             
        } while (opcion !=5); // Termina el bucle solo si seleccionas la opción 5    
    }
        // Muestro el menu con sus opciones para interactuar
        private static void mostrarMENU(){
        System.out.println("Inicio PAM");
        System.out.println("Selecciona una opcion");
        System.out.println("1. Reglamento POO");
        System.out.println("2. Lineamientos Classroom");
        System.out.println("3. Fechas de Parciales");
        System.out.println("4. Porcentajes por parcial");
        System.out.println("5. Salir");

    }
}
